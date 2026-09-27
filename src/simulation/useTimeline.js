import { useEffect, useRef, useState } from "react";

const BASE_INTERVAL_MS = 650;

// Advances a unit-per-tick playhead over [0, totalTime]. This only moves a
// number forward — every visual derived from it (process state, CPU box,
// ready queue, event log) is recomputed from the real segments each render,
// so speeding up or scrubbing can never desync the animation from the
// algorithm's actual output.
export function useTimeline(totalTime, resetKey) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTime(0);
    setPlaying(false);
  }, [resetKey]);

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

  const scrubTo = (t) => {
    setPlaying(false);
    setTime(Number(t));
  };

  return { time, playing, speed, setSpeed, togglePlay, step, reset, scrubTo };
}
