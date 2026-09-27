import { ALGORITHMS } from "../utils/calculations.js";
import { useTimeline } from "../simulation/useTimeline.js";
import ProcessStage from "./ProcessStage.jsx";
import ReadyQueue from "./ReadyQueue.jsx";
import CPUView from "./CPUView.jsx";
import GanttChart from "./GanttChart.jsx";
import PlayerControls from "./PlayerControls.jsx";
import EventLog from "./EventLog.jsx";

function statusLabel(time, totalTime, playing) {
  if (time >= totalTime) return { text: "COMPLETED", cls: "done" };
  if (playing) return { text: "RUNNING", cls: "running" };
  if (time > 0) return { text: "PAUSED", cls: "waiting" };
  return { text: "READY", cls: "pending" };
}

export default function SimulationStage({ algorithm, quantum, result, processIds }) {
  const { segments, table, totalTime } = result;
  const timeline = useTimeline(totalTime, `${algorithm}-${quantum}-${totalTime}`);
  const { time, playing } = timeline;
  const status = statusLabel(time, totalTime, playing);

  return (
    <div className="panel">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <span
          style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent-2)" }}
        >
          Algorithm: <strong style={{ color: "var(--text)" }}>{ALGORITHMS[algorithm].label}</strong>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-dim)" }}>
          Simulation Time: <strong style={{ color: "var(--text)" }}>{time}</strong> / {totalTime}
        </span>
        <span className={`status-chip ${status.cls}`}>
          <span className="status-dot" style={{ background: "currentColor" }} />
          {status.text}
        </span>
      </div>

      <p className="stage-block-title">Processes</p>
      <ProcessStage table={table} segments={segments} time={time} processIds={processIds} />

      <div style={{ height: 20 }} />

      <div className="stage-grid">
        <ReadyQueue segments={segments} table={table} time={time} processIds={processIds} />
        <CPUView segments={segments} time={time} totalTime={totalTime} processIds={processIds} />
      </div>

      <GanttChart
        segments={segments}
        totalTime={totalTime}
        processIds={processIds}
        currentTime={time}
      />

      <PlayerControls timeline={timeline} totalTime={totalTime} />

      <div style={{ height: 22 }} />
      <EventLog segments={segments} table={table} time={time} />
    </div>
  );
}
