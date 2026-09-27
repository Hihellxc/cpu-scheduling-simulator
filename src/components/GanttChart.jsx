import { colorFor } from "../utils/calculations.js";

export default function GanttChart({
  segments,
  totalTime,
  processIds,
  title,
  currentTime,
}) {
  if (!segments || segments.length === 0) return null;

  const hasPlayhead = typeof currentTime === "number";
  const ticks = [...new Set(segments.flatMap((s) => [s.start, s.end]))].sort(
    (a, b) => a - b
  );

  return (
    <div className="gantt-block">
      {title && <h3>{title}</h3>}
      <div className="gantt-track">
        {segments.map((seg, i) => {
          const duration = seg.end - seg.start;
          const widthPct = (duration / totalTime) * 100;
          const isIdle = seg.type === "idle";
          const bg = isIdle ? undefined : colorFor(seg.id, processIds);
          const isActiveNow =
            hasPlayhead && currentTime >= seg.start && currentTime < seg.end;
          const isDimmed = hasPlayhead && seg.start > currentTime;
          return (
            <div
              key={i}
              className={`gantt-seg ${isIdle ? "idle" : ""} ${
                isActiveNow ? "active-now" : ""
              } ${isDimmed ? "dimmed" : ""}`}
              style={{ width: `${widthPct}%`, background: bg }}
              title={`${isIdle ? "IDLE" : seg.id}: ${seg.start} → ${seg.end}`}
            >
              {widthPct > 3.5 ? (isIdle ? "—" : seg.id) : ""}
            </div>
          );
        })}
        {hasPlayhead && (
          <div
            className="playhead"
            style={{ left: `${Math.min(currentTime / totalTime, 1) * 100}%` }}
          />
        )}
      </div>
      <div className="gantt-ticks">
        {ticks.map((t, i) => (
          <span
            key={i}
            className="gantt-tick"
            style={{ left: `${(t / totalTime) * 100}%` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
