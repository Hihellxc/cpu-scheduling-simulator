// First Come, First Served — non-preemptive.
// Processes run strictly in arrival order; ties broken by process id.
export function fcfs(processes) {
  const queue = [...processes].sort(
    (a, b) => a.arrival - b.arrival || a.id.localeCompare(b.id)
  );

  let time = 0;
  const segments = [];
  const completion = {};
  const firstStart = {};

  for (const p of queue) {
    if (p.arrival > time) {
      segments.push({ type: "idle", start: time, end: p.arrival });
      time = p.arrival;
    }
    firstStart[p.id] = time;
    const end = time + p.burst;
    segments.push({ type: "process", id: p.id, start: time, end });
    completion[p.id] = end;
    time = end;
  }

  return { segments, completion, firstStart };
}
