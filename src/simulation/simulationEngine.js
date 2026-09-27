// Everything here is read-only relative to the algorithms: it takes the
// already-computed segments + result table and derives presentation data
// (process state, ready-queue order, a human-readable event log) for a
// given point on the timeline. No scheduling decision is made in this file
// — that keeps the animation honest to whatever fcfs/sjf/rr/priority
// actually produced.

export function statusAt(table, segments, t) {
  return table.map((row) => {
    const runningSeg = segments.find(
      (s) => s.type === "process" && s.id === row.id && t >= s.start && t < s.end
    );
    let state;
    if (row.arrival > t) state = "new";
    else if (runningSeg) state = "running";
    else if (t >= row.completion) state = "completed";
    else state = "ready";
    return { id: row.id, state };
  });
}

// Order the waiting processes by how soon each of them is next scheduled —
// that ordering comes straight from the real segments, so it always
// matches what the chosen algorithm decided, never an assumed FIFO order.
export function readyQueueAt(segments, table, t) {
  const runningId = segments.find(
    (s) => s.type === "process" && t >= s.start && t < s.end
  )?.id;

  return table
    .filter((p) => p.arrival <= t && t < p.completion && p.id !== runningId)
    .map((p) => {
      const nextSeg = segments
        .filter((s) => s.type === "process" && s.id === p.id && s.start >= t)
        .sort((a, b) => a.start - b.start)[0];
      return { id: p.id, nextStart: nextSeg ? nextSeg.start : Infinity };
    })
    .sort((a, b) => a.nextStart - b.nextStart || a.id.localeCompare(b.id))
    .map((x) => x.id);
}

export function currentSegmentAt(segments, t) {
  return segments.find((s) => t >= s.start && t < s.end) || null;
}

const KIND_ORDER = { arrival: 0, idle: 1, resumed: 2, started: 2, requeued: 3, completed: 4 };

export function buildEventLog(segments, table) {
  const events = [];

  table.forEach((p) => {
    events.push({ time: p.arrival, kind: "arrival", text: `${p.id} เข้ามาในระบบ (Arrival)` });
  });

  segments.forEach((seg) => {
    if (seg.type === "idle") {
      events.push({ time: seg.start, kind: "idle", text: "CPU ว่าง (Idle)" });
      return;
    }
    const row = table.find((r) => r.id === seg.id);
    const isFirstStart = row && seg.start === row.start;
    events.push({
      time: seg.start,
      kind: isFirstStart ? "started" : "resumed",
      text: isFirstStart
        ? `${seg.id} ถูกเลือกและเริ่มทำงานบน CPU`
        : `${seg.id} กลับมาทำงานต่อบน CPU`,
    });

    const isCompletion = row && seg.end === row.completion;
    if (isCompletion) {
      events.push({ time: seg.end, kind: "completed", text: `${seg.id} ทำงานเสร็จสมบูรณ์ (Completed)` });
    } else {
      events.push({
        time: seg.end,
        kind: "requeued",
        text: `${seg.id} ใช้ Time Quantum ครบ กลับเข้า Ready Queue`,
      });
    }
  });

  return events.sort(
    (a, b) => a.time - b.time || KIND_ORDER[a.kind] - KIND_ORDER[b.kind]
  );
}
