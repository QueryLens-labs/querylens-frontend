import { Icon } from "./Icon";

export function DatabaseSchemaPanel() {
  return (
    <section className="panel schema-panel" aria-labelledby="schema-title">
      <div className="panel-heading">
        <div className="panel-title-group">
          <span className="panel-icon panel-icon--green"><Icon name="schema" size={18} /></span>
          <div>
            <h2 id="schema-title">Database Schema</h2>
            <p>Tables and relationships</p>
          </div>
        </div>
        <span className="pending-label"><Icon name="pending" size={14} /> IN DEVELOPMENT</span>
      </div>
      <div className="schema-pending-state">
        <span className="schema-illustration"><Icon name="relationship" size={24} /></span>
        <strong>Schema explorer is coming soon</strong>
        <p>The live schema view is planned for a later phase. No table details are shown until the API provides them.</p>
      </div>
    </section>
  );
}
