import { fcfs } from "../algorithms/fcfs.js";
import { sjf } from "../algorithms/sjf.js";
import { roundRobin } from "../algorithms/roundRobin.js";
import { priorityScheduling } from "../algorithms/priority.js";

export const ALGORITHMS = {
  fcfs: { label: "FCFS", full: "First Come, First Served" },
  sjf: { label: "SJF", full: "Shortest Job First" },
  rr: { label: "Round Robin", full: "Round Robin" },
  priority: { label: "Priority", full: "Priority Scheduling" },
};

// Process color palette — assigned by index, stable across a run.
// Strictly pink / blue, alternating a strong and a soft tint of each so
// adjacent processes on the Gantt chart never read as the same color.
export const PROCESS_COLORS = [
  "#FF6FA5", // pink
  "#4FC3F7", // blue
  "#caaafa", // lavender
  "#6FE3C4", // mint
  "#FFB877", // peach
  "#F4E07A", // yellow
  "#FF8FC7", // soft pink (fallback tint if >6 processes)
  "#7FE0FF", // soft blue
];

export function colorFor(processId, allIds) {
  const idx = allIds.indexOf(processId);
  return PROCESS_COLORS[idx % PROCESS_COLORS.length];
}

function runAlgorithm(key, processes, quantum) {
  switch (key) {
    case "fcfs":
      return fcfs(processes);
    case "sjf":
      return sjf(processes);
    case "priority":
      return priorityScheduling(processes);
    case "rr":
      return roundRobin(processes, quantum);
    default:
      throw new Error(`Unknown algorithm: ${key}`);
  }
}

function buildTable(processes, completion, firstStart) {
  return processes.map((p) => {
    const comp = completion[p.id];
    const start = firstStart[p.id];
    const turnaround = comp - p.arrival;
    const waiting = turnaround - p.burst;
    const response = start - p.arrival;
    return {
      id: p.id,
      arrival: p.arrival,
      burst: p.burst,
      priority: p.priority,
      start,
      completion: comp,
      turnaround,
      waiting,
      response,
    };
  });
}

function averageOf(table, key) {
  if (table.length === 0) return 0;
  const sum = table.reduce((s, r) => s + r[key], 0);
  return sum / table.length;
}

export function simulate(key, processes, quantum) {
  const { segments, completion, firstStart } = runAlgorithm(
    key,
    processes,
    quantum
  );
  const table = buildTable(processes, completion, firstStart);
  const totalBurst = processes.reduce((s, p) => s + p.burst, 0);
  const totalTime = segments.length ? segments[segments.length - 1].end : 0;
  const utilization = totalTime > 0 ? (totalBurst / totalTime) * 100 : 0;

  return {
    key,
    segments,
    table,
    totalTime,
    utilization: Math.round(utilization * 10) / 10,
    averages: {
      waiting: averageOf(table, "waiting"),
      turnaround: averageOf(table, "turnaround"),
      response: averageOf(table, "response"),
    },
  };
}

export const SAMPLE_PROCESSES = [
  { id: "P1", arrival: 0, burst: 5, priority: 2 },
  { id: "P2", arrival: 1, burst: 3, priority: 1 },
  { id: "P3", arrival: 2, burst: 8, priority: 3 },
  { id: "P4", arrival: 3, burst: 2, priority: 2 },
];

export function validateProcesses(processes) {
  const errors = [];
  const ids = new Set();

  if (processes.length === 0) {
    errors.push("เพิ่มอย่างน้อยหนึ่ง Process ก่อนรัน Simulation");
  }

  processes.forEach((p, i) => {
    const row = `Process ${p.id || i + 1}`;
    if (!p.id || !p.id.trim()) errors.push(`${row}: ต้องระบุ Process ID`);
    if (ids.has(p.id)) errors.push(`${row}: Process ID ซ้ำกัน`);
    ids.add(p.id);
    if (p.arrival === "" || p.arrival === null || isNaN(p.arrival) || p.arrival < 0)
      errors.push(`${row}: Arrival Time ต้องเป็นตัวเลข ≥ 0`);
    if (p.burst === "" || p.burst === null || isNaN(p.burst) || p.burst <= 0)
      errors.push(`${row}: Burst Time ต้องเป็นตัวเลขมากกว่า 0`);
    if (p.priority === "" || p.priority === null || isNaN(p.priority))
      errors.push(`${row}: Priority ต้องเป็นตัวเลข`);
  });

  return errors;
}
