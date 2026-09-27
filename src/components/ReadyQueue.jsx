import { colorFor } from "../utils/calculations.js";
import { readyQueueAt } from "../simulation/simulationEngine.js";

export default function ReadyQueue({ segments, table, time, processIds }) {
  const queue = readyQueueAt(segments, table, time);

  return (
    <div>
      <p className="stage-block-title">Ready Queue</p>
      <div className="ready-queue-track">
        {queue.length === 0 && (
          <span className="ready-queue-empty">ไม่มี Process รอคิวอยู่ตอนนี้</span>
        )}
        {queue.map((id, i) => (
          <div
            className="queue-chip"
            key={id}
            style={{ borderLeftColor: colorFor(id, processIds) }}
          >
            <span className="pos">#{i + 1}</span>
            {id}
          </div>
        ))}
      </div>
    </div>
  );
}
