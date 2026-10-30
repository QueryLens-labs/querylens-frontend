import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap } from "@codemirror/view";
import type { AnalyzeResult } from "../types";
import { Icon } from "./Icon";
import { MetricsPanel } from "./MetricsPanel";

interface QueryAnalyzerProps {
  query: string;
  onQueryChange: (query: string) => void;
  result: AnalyzeResult | null;
  error: string | null;
  running: boolean;
  onAnalyze: () => void;
}

export function QueryAnalyzer({
  query,
  onQueryChange,
  result,
  error,
  running,
  onAnalyze,
}: QueryAnalyzerProps) {
  const extensions = useMemo(() => [
    sql({ dialect: PostgreSQL }),
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({ "aria-label": "SQL query editor" }),
    keymap.of([{
      key: "Mod-Enter",
      run: () => {
        if (!running) onAnalyze();
        return true;
      },
    }]),
  ], [onAnalyze, running]);

  return (
    <section className="panel analyzer-panel" aria-labelledby="analyzer-title">
      <div className="panel-heading analyzer-heading">
        <div className="panel-title-group">
          <span className="panel-icon panel-icon--blue"><Icon name="query" size={18} /></span>
          <div>
            <h2 id="analyzer-title">Query Analyzer</h2>
            <p>Write a read-only PostgreSQL query to inspect its execution plan.</p>
          </div>
        </div>
        <span className="read-only-pill"><span /> READ ONLY</span>
      </div>

      <div className="analyzer-body">
        <div className="editor-column">
          <div className="editor-window">
            <div className="editor-toolbar">
              <div className="editor-file"><span className="file-dot" /> query.sql</div>
              <span>PostgreSQL</span>
            </div>
            <CodeMirror
              value={query}
              onChange={onQueryChange}
              extensions={extensions}
              theme={oneDark}
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
                highlightActiveLine: true,
                bracketMatching: true,
                autocompletion: false,
              }}
              editable={!running}
              aria-label="SQL query editor"
              className="sql-code-editor"
              height="242px"
            />
            <div className="editor-foot">
              <span>Ctrl / ⌘ + Enter to run</span>
              <span>{query.length.toLocaleString("en-US")} characters</span>
            </div>
          </div>
          <div className="editor-actions">
            <span className="execution-note"><span className="info-mark">i</span> EXPLAIN ANALYZE executes the query</span>
            <button className="run-button" type="button" onClick={onAnalyze} disabled={running || !query.trim()}>
              {running ? <span className="spinner" /> : <Icon name="play" size={15} />}
              {running ? "Analyzing…" : "Run Analysis"}
              {!running && <span className="button-shortcut">⌘ ↵</span>}
            </button>
          </div>
          {error && !running && (
            <div className="analyzer-error" role="alert">
              <span className="error-icon">!</span>
              <div><strong>Analysis failed</strong><p>{error}</p></div>
            </div>
          )}
          {running && <div className="analyzer-running" aria-live="polite"><span className="spinner" /> PostgreSQL is analyzing the query…</div>}
        </div>
        <MetricsPanel query={query} result={result} />
      </div>
    </section>
  );
}
