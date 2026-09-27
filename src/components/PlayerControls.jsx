import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";

export default function PlayerControls({ timeline, totalTime }) {
  const { time, playing, speed, setSpeed, togglePlay, step, reset, scrubTo } = timeline;

  return (
    <div className="player-controls">
      <button className="player-btn" onClick={reset} title="Reset">
        <RotateCcw size={15} />
      </button>
      <button className="player-btn" onClick={() => step(-1)} title="Previous Step">
        <SkipBack size={15} />
      </button>
      <button
        className={`player-btn ${playing ? "play" : ""}`}
        onClick={togglePlay}
        title={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={15} /> : <Play size={15} />}
      </button>
      <button className="player-btn" onClick={() => step(1)} title="Next Step">
        <SkipForward size={15} />
      </button>
      <input
        className="player-slider"
        type="range"
        min={0}
        max={totalTime}
        step={1}
        value={time}
        onChange={(e) => scrubTo(e.target.value)}
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
  );
}
