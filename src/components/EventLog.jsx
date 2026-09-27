import { useMemo } from "react";
import { buildEventLog } from "../simulation/simulationEngine.js";

export default function EventLog({ segments, table, time }) {
  const events = useMemo(() => buildEventLog(segments, table), [segments, table]);
  const visible = events.filter((e) => e.time <= time);

  return (
    <div>
      <p className="stage-block-title">Event Log</p>
      <div className="event-log">
        {visible.length === 0 && (
          <div className="event-log-empty">ยังไม่มีเหตุการณ์ — กด Play เพื่อเริ่ม</div>
        )}
        {visible.map((e, i) => (
          <div className={`event-log-item kind-${e.kind}`} key={i}>
            <span className="t">[T{e.time}]</span>
            <span>{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
