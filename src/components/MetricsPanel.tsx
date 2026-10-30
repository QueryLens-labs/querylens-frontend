import type { AnalyzeResult } from "../types";
import { formatMilliseconds, formatNumber, formatTotalTime } from "../utils/format";
import { Icon, type IconName } from "./Icon";

interface MetricsPanelProps {
  query: string;
  result: AnalyzeResult | null;
}

function getQueryType(query: string): string {
  const normalized = query.trim().replace(/^(?:--[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/\s*)+/, "");
  return /^WITH\b/i.test(normalized) ? "SELECT · CTE" : "SELECT";
}

function Metric({ label, value, icon, accent = "blue", detail }: {
  label: string;
  value: string;
  icon: IconName;
  accent?: "blue" | "green" | "amber" | "violet";
  detail?: string;
}) {
  return (
    <div className={`metric-card metric-card--${accent}`}>
      <span className="metric-icon"><Icon name={icon} size={16} /></span>
      <div className="metric-copy">
        <span className="metric-label">{label}</span>
        <strong className="metric-value">{value}</strong>
        {detail && <span className="metric-detail">{detail}</span>}
      </div>
    </div>
  );
}

export function MetricsPanel({ query, result }: MetricsPanelProps) {
  const queryType = result ? getQueryType(query) : "Not available";
  const estimatedRows = result?.root.estimated_rows ?? null;
  const actualRows = result?.root.actual_rows ?? null;
  const rowsValue = result ? formatNumber(actualRows) : "Not available";

  return (
    <aside className="metrics-panel" aria-label="Query metrics">
      <div className="metrics-heading">
        <h3>Query Metrics</h3>
        <span className={result ? "metrics-live" : "metrics-idle"}><i /> {result ? "LIVE" : "WAITING"}</span>
      </div>
      <div className="metrics-grid">
        <Metric label="Query type" value={queryType} icon="query" accent="blue" />
        <Metric
          label="Estimated cost"
          value={result ? formatNumber(result.root.total_cost, 2) : "Not available"}
          detail={result ? "PostgreSQL cost units" : undefined}
          icon="cost"
          accent="amber"
        />
        <Metric
          label="Execution time"
          value={result ? formatMilliseconds(result.execution_time_ms) : "Not available"}
          icon="clock"
          accent="green"
        />
        <Metric
          label="Rows"
          value={rowsValue}
          detail={result ? `Estimated ${formatNumber(estimatedRows)} rows` : undefined}
          icon="rows"
          accent="violet"
        />
        <Metric
          label="Planning time"
          value={result ? formatMilliseconds(result.planning_time_ms) : "Not available"}
          icon="clock"
          accent="blue"
        />
        <Metric
          label="Total time"
          value={result ? formatTotalTime(result.planning_time_ms, result.execution_time_ms) : "Not available"}
          detail={result ? "Planning + execution" : undefined}
          icon="execution"
          accent="green"
        />
      </div>
      <p className="metric-cost-note"><Icon name="pending" size={13} /> Estimated cost is not elapsed time.</p>
    </aside>
  );
}
