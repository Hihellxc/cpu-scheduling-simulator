// Round Robin — preemptive, fixed time quantum.
// Newly-arrived processes are enqueued before a process that has just used
// up its quantum (and still has remaining time) is placed back in the
// queue — the standard convention for tie-free Round Robin simulation.
export function roundRobin(processes, quantum) {
  const q = Math.max(1, Math.floor(quantum) || 1);
  const sorted = [...processes]
    .map((p) => ({ ...p, remaining: p.burst }))
    .sort((a, b) => a.arrival - b.arrival || a.id.localeCompare(b.id));
  const n = sorted.length;

  let time = 0;
  let arrivalPtr = 0;
  const queue = [];
  const segments = [];
  const completion = {};
  const firstStart = {};

  const enqueueArrivals = (uptoTime) => {
    while (arrivalPtr < n && sorted[arrivalPtr].arrival <= uptoTime) {
      queue.push(sorted[arrivalPtr]);
      arrivalPtr++;
    }
  };

  enqueueArrivals(0);

  let completed = 0;
  while (completed < n) {
    if (queue.length === 0) {
      const nextArrival = sorted[arrivalPtr].arrival;
      if (nextArrival > time) {
        segments.push({ type: "idle", start: time, end: nextArrival });
      }
      time = nextArrival;
      enqueueArrivals(time);
      continue;
    }

    const p = queue.shift();
    if (firstStart[p.id] === undefined) firstStart[p.id] = time;

    const run = Math.min(q, p.remaining);
    const start = time;
    const end = time + run;
    segments.push({ type: "process", id: p.id, start, end });

    time = end;
    p.remaining -= run;
    enqueueArrivals(time);

    if (p.remaining > 0) {
      queue.push(p);
    } else {
      completion[p.id] = time;
      completed++;
    }
  }

  return { segments, completion, firstStart };
}
