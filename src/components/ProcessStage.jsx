import { colorFor } from "../utils/calculations.js";
import { statusAt } from "../simulation/simulationEngine.js";

// Each state gets its own block so it's visually obvious at a glance which
// process is actually running vs. which ones are just waiting their turn.
const GROUPS = [
  { state: "running", label: "กำลังทำงาน" },
  { state: "ready", label: "รอคิว" },
  { state: "new", label: "ยังไม่มา" },
  { state: "completed", label: "เสร็จแล้ว" },
];

export default function ProcessStage({ table, segments, time, processIds }) {
  const statuses = statusAt(table, segments, time);

  const byState = Object.fromEntries(GROUPS.map((g) => [g.state, []]));
  statuses.forEach(({ id, state }) => byState[state].push(id));

  return (
    <div className="process-stage-groups">
      {GROUPS.map(({ state, label }) => {
        const ids = byState[state];
        if (ids.length === 0) return null;
        return (
          <div className={`process-group process-group-${state}`} key={state}>
            <p className="process-group-title">
              {label} <span className="process-group-count">({ids.length})</span>
            </p>
            <div className="process-stage">
              {ids.map((id) => {
                const color = colorFor(id, processIds);
                return (
                  <div className={`process-card state-${state}`} key={id}>
                    <div className="pid">
                      <span className="dot" style={{ background: color }} />
                      {id}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
