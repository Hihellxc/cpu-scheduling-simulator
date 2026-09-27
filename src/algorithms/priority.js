// Priority Scheduling — non-preemptive.
// A LOWER priority number means HIGHER priority (0 runs before 5).
// Whenever the CPU is free, the arrived process with the lowest priority
// number runs to completion. Ties broken by arrival time, then process id.
export function priorityScheduling(processes) {
  const pending = [...processes];
  const n = pending.length;
  const done = new Set();

  let time = 0;
  const segments = [];
  const completion = {};
  const firstStart = {};

  while (done.size < n) {
    const available = pending.filter(
      (p) => !done.has(p.id) && p.arrival <= time
    );

    if (available.length === 0) {
      const nextArrival = Math.min(
        ...pending.filter((p) => !done.has(p.id)).map((p) => p.arrival)
      );
      segments.push({ type: "idle", start: time, end: nextArrival });
      time = nextArrival;
      continue;
    }

    available.sort(
      (a, b) =>
        a.priority - b.priority ||
        a.arrival - b.arrival ||
        a.id.localeCompare(b.id)
    );
    const p = available[0];

    firstStart[p.id] = time;
    const end = time + p.burst;
    segments.push({ type: "process", id: p.id, start: time, end });
    completion[p.id] = end;
    time = end;
    done.add(p.id);
  }

  return { segments, completion, firstStart };
}
