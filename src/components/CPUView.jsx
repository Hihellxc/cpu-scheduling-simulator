import { colorFor } from "../utils/calculations.js";
import { currentSegmentAt } from "../simulation/simulationEngine.js";

export default function CPUView({ segments, time, totalTime, processIds }) {
  const seg = currentSegmentAt(segments, time);
  const finished = time >= totalTime;
  const isBusy = seg && seg.type === "process";
  const color = isBusy ? colorFor(seg.id, processIds) : undefined;
  const progressPct = isBusy
    ? ((time - seg.start) / (seg.end - seg.start)) * 100
    : 0;
  const remaining = isBusy ? seg.end - time : 0;

  return (
    <div>
      <p className="stage-block-title">CPU</p>
      <div className={`cpu-box ${isBusy ? "busy" : "idle"}`}>
        {finished ? (
          <>
            <div className="cpu-label">Simulation Complete</div>
            <div className="cpu-pid" style={{ color: "var(--good)" }}>
              ✓ DONE
            </div>
          </>
        ) : isBusy ? (
          <>
            <div className="cpu-label">Running</div>
            <div className="cpu-pid" style={{ color }}>
              {seg.id}
            </div>
            <div className="cpu-sub">Remaining: {remaining}</div>
            <div className="cpu-progress-track">
              <div
                className="cpu-progress-fill"
                style={{ width: `${progressPct}%`, background: color }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="cpu-label">Status</div>
            <div className="cpu-pid">IDLE</div>
            <div className="cpu-sub">ไม่มี Process ให้ทำงาน</div>
          </>
        )}
      </div>
    </div>
  );
}
