import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import GanttChart from "./GanttChart.jsx";
import { colorFor } from "../utils/calculations.js";

const BASE_INTERVAL_MS = 650;

function statusAt(table, segments, t) {
  return table.map((row) => {
    const runningSeg = segments.find(
      (s) => s.type === "process" && s.id === row.id && t >= s.start && t < s.end
    );
    let state;
    if (row.arrival > t) state = "pending";
    else if (runningSeg) state = "running";
    else if (t >= row.completion) state = "done";
    else state = "waiting";
    return { id: row.id, state };
  });
}

export default function GanttPlayer({ segments, totalTime, processIds, title, table }) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    // A different simulation result was produced — start the playhead over.
    setTime(0);
    setPlaying(false);
  }, [segments, totalTime]);

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setTime((t) => {
        if (t >= totalTime) {
          setPlaying(false);
          return t;
        }
        return Math.min(t + 1, totalTime);
      });
    }, BASE_INTERVAL_MS / speed);
    return () => clearInterval(intervalRef.current);
  }, [playing, speed, totalTime]);

  const togglePlay = () => {
    if (time >= totalTime) setTime(0);
    setPlaying((p) => !p);
  };

  const step = (delta) => {
    setPlaying(false);
    setTime((t) => Math.max(0, Math.min(totalTime, t + delta)));
  };

  const reset = () => {
    setPlaying(false);
    setTime(0);
  };

  const currentSeg = segments.find((s) => time >= s.start && time < s.end);
  const nowLabel =
    time >= totalTime
      ? "เสร็จสิ้นทุก Process"
      : currentSeg
      ? currentSeg.type === "idle"
        ? "CPU ว่าง (Idle)"
        : `กำลังรัน ${currentSeg.id}`
      : "—";

  const statuses = statusAt(table, segments, time);
  const stateLabel = { pending: "ยังไม่มา", waiting: "รอคิว", running: "กำลังรัน", done: "เสร็จแล้ว" };

  return (
    <div className="gantt-block">
      <GanttChart
        segments={segments}
        totalTime={totalTime}
        processIds={processIds}
        title={title}
        currentTime={time}
      />

      <div className="player-controls">
        <button className="player-btn" onClick={reset} title="Reset">
          <RotateCcw size={15} />
        </button>
        <button className="player-btn" onClick={() => step(-1)} title="Step back">
          <SkipBack size={15} />
        </button>
        <button
          className={`player-btn ${playing ? "play" : ""}`}
          onClick={togglePlay}
          title={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button className="player-btn" onClick={() => step(1)} title="Step forward">
          <SkipForward size={15} />
        </button>
        <input
          className="player-slider"
          type="range"
          min={0}
          max={totalTime}
          step={1}
          value={time}
          onChange={(e) => {
            setPlaying(false);
            setTime(Number(e.target.value));
          }}
        />
        <div className="speed-group">
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              className={`speed-btn ${speed === s ? "active" : ""}`}
              onClick={() => setSpeed(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="player-status">
        เวลา <strong>{time}</strong> / {totalTime} — {nowLabel}
      </div>

      <div className="status-chips">
        {statuses.map((s) => (
          <span className={`status-chip ${s.state}`} key={s.id}>
            <span
              className="status-dot"
              style={{
                background:
                  s.state === "pending"
                    ? "var(--border)"
                    : colorFor(s.id, processIds),
              }}
            />
            {s.id} · {stateLabel[s.state]}
          </span>
        ))}
      </div>
    </div>
  );
}
