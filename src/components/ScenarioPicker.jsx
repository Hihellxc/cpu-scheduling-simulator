import { SCENARIOS } from "../data/scenarios.js";

export default function ScenarioPicker({ onSelect }) {
  return (
    <div className="scenario-grid">
      {SCENARIOS.map((s) => (
        <div className="scenario-card" key={s.key} onClick={() => onSelect(s)}>
          <div className="name">{s.label}</div>
          <div className="hint">{s.hint}</div>
        </div>
      ))}
    </div>
  );
}
