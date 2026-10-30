import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { analyzeQuery, fetchHealth } from "./api";
import type { AnalyzeResult, ApiHealth, PlanNode } from "./types";

const SAMPLE_QUERY = `SELECT
  p.category,
  COUNT(*) AS total_sales,
  ROUND(SUM(s.quantity * s.unit_price)::numeric, 2) AS revenue
FROM sales AS s
JOIN products AS p ON p.id = s.product_id
WHERE s.sold_at >= CURRENT_DATE - INTERVAL '180 days'
GROUP BY p.category
ORDER BY revenue DESC;`;

function Icon({ name, size = 18 }: { name: "lens" | "play" | "database" | "clock" | "layers" | "arrow"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (name === "lens") return <svg {...common}><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4.2 4.2" /><path d="M8.4 10.8h4.8M10.8 8.4v4.8" /></svg>;
  if (name === "play") return <svg {...common} fill="currentColor" stroke="none"><path d="M7 4.8a1 1 0 0 1 1.52-.85l10.15 6.2a1 1 0 0 1 0 1.7L8.52 18.05A1 1 0 0 1 7 17.2V4.8Z" /></svg>;
  if (name === "database") return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></svg>;
  if (name === "layers") return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>;
  return <svg {...common}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function formatNumber(value: number | null, digits = 0): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: digits }).format(value);
}

function PlanTree({ node, depth = 0 }: { node: PlanNode; depth?: number }) {
  const details = [node.relation_name, node.index_name, node.join_type && `${node.join_type} join`]
    .filter(Boolean)
    .join(" · ");
  const style = { "--depth": depth } as CSSProperties;

  return (
    <div className="plan-branch" style={style}>
      <article className="plan-node">
        <div className="plan-node-top">
          <span className="node-glyph"><Icon name="layers" size={15} /></span>
          <div className="node-name-wrap">
            <strong className="node-name">{node.node_type}</strong>
            {details && <span className="node-detail">{details}</span>}
          </div>
          {node.total_cost !== null && <span className="node-cost">{formatNumber(node.total_cost, 2)} cost</span>}
        </div>
        <div className="node-stats">
          <span><small>Filas estimadas</small><b>{formatNumber(node.estimated_rows)}</b></span>
          <span><small>Filas reales</small><b>{formatNumber(node.actual_rows)}</b></span>
          {node.actual_total_time_ms !== null && <span><small>Tiempo nodo</small><b>{formatNumber(node.actual_total_time_ms, 3)} ms</b></span>}
          {node.rows_removed_by_filter !== null && <span><small>Filas filtradas</small><b>{formatNumber(node.rows_removed_by_filter)}</b></span>}
          {(node.shared_hit_blocks !== null || node.shared_read_blocks !== null) && (
            <span><small>Buffers hit / read</small><b>{formatNumber(node.shared_hit_blocks)} / {formatNumber(node.shared_read_blocks)}</b></span>
          )}
        </div>
      </article>
      {node.children.length > 0 && (
        <div className="plan-children">
          {node.children.map((child, index) => <PlanTree key={`${child.node_type}-${index}`} node={child} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, suffix, icon }: { label: string; value: string; suffix?: string; icon: "clock" | "database" | "layers" }) {
  return (
    <div className="metric-card">
      <span className="metric-icon"><Icon name={icon} size={16} /></span>
      <div><div className="metric-label">{label}</div><div className="metric-value">{value}<small>{suffix}</small></div></div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState(SAMPLE_QUERY);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [healthError, setHealthError] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const checkHealth = useCallback(async () => {
    try {
      const response = await fetchHealth();
      setHealth(response);
      setHealthError(false);
    } catch {
      setHealth(null);
      setHealthError(true);
    }
  }, []);

  useEffect(() => {
    void checkHealth();
    const timer = window.setInterval(() => void checkHealth(), 20_000);
    return () => window.clearInterval(timer);
  }, [checkHealth]);

  async function handleAnalyze() {
    setRunning(true);
    setError(null);
    setResult(null);
    try {
      setResult(await analyzeQuery(query));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "No se pudo analizar la consulta.");
    } finally {
      setRunning(false);
    }
  }

  function onEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      if (!running) void handleAnalyze();
    } else if (event.key === "Tab") {
      event.preventDefault();
      const editor = event.currentTarget;
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const nextQuery = `${query.slice(0, start)}  ${query.slice(end)}`;
      setQuery(nextQuery);
      requestAnimationFrame(() => {
        editor.selectionStart = editor.selectionEnd = start + 2;
      });
    }
  }

  const lines = query.split("\n").length;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label="QueryLens inicio">
            <span className="brand-mark"><Icon name="lens" size={21} /></span>
            <span>Query<span className="brand-accent">Lens</span></span>
          </a>
          <div className="topbar-right">
            <span className="environment-pill"><span className="environment-dot" />LOCAL WORKSPACE</span>
            <span className={`connection-status ${healthError ? "is-down" : ""}`}>
              <span className="status-dot" />
              {health ? `PostgreSQL ${health.postgres_version}` : healthError ? "Sin conexión" : "Conectando"}
            </span>
          </div>
        </div>
      </header>

      <main className="main-content" id="top">
        <section className="intro-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />QUERY WORKSPACE</div>
            <h1>Entiende lo que ejecuta tu SQL.</h1>
            <p>Inspecciona planes de PostgreSQL con métricas reales, nodo a nodo.</p>
          </div>
          <div className="intro-meta"><span className="meta-icon"><Icon name="database" size={16} /></span><span>Base de demostración</span><i /><span>100k ventas</span></div>
        </section>

        <section className="workspace" aria-label="Área de análisis SQL">
          <div className="editor-panel">
            <div className="panel-heading">
              <div className="panel-title"><span className="panel-index">01</span><div><h2>Consulta SQL</h2><p>Escribe una consulta de solo lectura</p></div></div>
              <span className="read-only-pill"><span />READ ONLY</span>
            </div>
            <div className="editor-window">
              <div className="editor-toolbar"><div className="editor-file"><span className="file-dot" />query.sql <span className="editor-modified">·</span></div><span>PostgreSQL</span></div>
              <div className="code-editor">
                <div className="line-numbers" aria-hidden="true">{Array.from({ length: Math.max(lines, 12) }, (_, index) => <span key={index}>{index + 1}</span>)}</div>
                <textarea
                  ref={textAreaRef}
                  aria-label="Consulta SQL"
                  spellCheck={false}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onEditorKeyDown}
                />
              </div>
              <div className="editor-foot"><span>Ctrl / ⌘ + Enter para ejecutar</span><span>{query.length.toLocaleString("es-ES")} caracteres</span></div>
            </div>
            <div className="editor-actions">
              <span className="execution-note"><span className="info-mark">i</span> EXPLAIN ANALYZE ejecuta la consulta</span>
              <button className="run-button" onClick={() => void handleAnalyze()} disabled={running || !query.trim()}>
                {running ? <span className="spinner" /> : <Icon name="play" size={15} />}
                {running ? "Analizando" : "Analizar consulta"}
                {!running && <span className="button-shortcut">Ctrl ↵</span>}
              </button>
            </div>
          </div>

          <div className="results-panel">
            <div className="panel-heading results-heading">
              <div className="panel-title"><span className="panel-index">02</span><div><h2>Plan de ejecución</h2><p>{result ? "Resultado de PostgreSQL" : "El resultado aparecerá aquí"}</p></div></div>
              {result && <span className="result-badge"><span />COMPLETADO</span>}
            </div>

            {running && <div className="result-state" aria-live="polite"><span className="large-spinner" /><strong>Analizando consulta</strong><span>PostgreSQL está ejecutando el plan…</span></div>}
            {!running && error && <div className="error-state" role="alert"><div className="error-icon">!</div><div><strong>No se pudo analizar</strong><p>{error}</p><span>Comprueba la sintaxis y que la consulta sea de solo lectura.</span></div></div>}
            {!running && !error && !result && <div className="empty-state"><div className="empty-illustration"><div className="empty-ring ring-one" /><div className="empty-ring ring-two" /><span><Icon name="layers" size={25} /></span></div><strong>Tu plan comienza aquí</strong><p>Ejecuta la consulta para ver el árbol<br className="desktop-break" /> y las métricas que devuelve PostgreSQL.</p><div className="empty-tags"><span><i /> Filas reales</span><span><i /> Coste estimado</span></div></div>}

            {!running && result && <div className="result-content">
              <div className="metrics-grid">
                <MetricCard label="Tiempo total" value={formatNumber(result.execution_time_ms, 3)} suffix=" ms" icon="clock" />
                <MetricCard label="Planificación" value={formatNumber(result.planning_time_ms, 3)} suffix=" ms" icon="clock" />
                <MetricCard label="Coste estimado" value={formatNumber(result.root.total_cost, 2)} suffix=" unidades" icon="database" />
              </div>
              <div className="plan-caption"><span><Icon name="layers" size={15} /> Árbol del plan</span><span>Raíz → hojas</span></div>
              <div className="plan-tree"><PlanTree node={result.root} /></div>
              <div className="cost-note"><span className="info-mark">i</span> El coste es una estimación de PostgreSQL en unidades internas; no representa tiempo.</div>
            </div>}
          </div>
        </section>

        <footer className="page-footer"><span>QUERYLENS <i>·</i> ANALIZADOR LOCAL</span><span>Consultas limitadas a SELECT <i>·</i> Límite de ejecución 10 s</span></footer>
      </main>
    </div>
  );
}

export default App;

