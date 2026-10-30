import { Icon } from "./Icon";

export function VisualFlowPanel() {
  return (
    <section className="panel visual-flow-panel" aria-labelledby="flow-title">
      <div className="panel-heading">
        <div className="panel-title-group">
          <span className="panel-icon panel-icon--blue"><Icon name="flow" size={18} /></span>
          <div>
            <h2 id="flow-title">Visual Execution Flow</h2>
            <p>Follow how PostgreSQL processes the plan</p>
          </div>
        </div>
        <span className="pending-label"><Icon name="pending" size={14} /> PHASE 2.3</span>
      </div>
      <div className="flow-pending-state">
        <span className="flow-pending-icon"><Icon name="flow" size={23} /></span>
        <strong>Interactive flow is planned</strong>
        <p>This view will be generated from a real plan in a future phase.</p>
      </div>
    </section>
  );
}
