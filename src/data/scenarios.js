// Preset process datasets — selecting one loads it straight into the
// Process Configuration table so a specific scheduling behaviour can be
// demonstrated without typing numbers by hand.

export const SCENARIOS = [
  {
    key: "basic",
    label: "Basic Scenario",
    hint: "ชุดข้อมูลมาตรฐานสำหรับทดสอบทุก Algorithm",
    algorithm: "fcfs",
    quantum: 2,
    processes: [
      { id: "P1", arrival: 0, burst: 5, priority: 2 },
      { id: "P2", arrival: 1, burst: 3, priority: 1 },
      { id: "P3", arrival: 2, burst: 8, priority: 3 },
      { id: "P4", arrival: 3, burst: 2, priority: 2 },
    ],
  },
  {
    key: "same-arrival",
    label: "Same Arrival Time",
    hint: "ทุก Process มาถึงพร้อมกันที่ Time 0",
    algorithm: "sjf",
    quantum: 2,
    processes: [
      { id: "P1", arrival: 0, burst: 6, priority: 3 },
      { id: "P2", arrival: 0, burst: 2, priority: 1 },
      { id: "P3", arrival: 0, burst: 4, priority: 2 },
      { id: "P4", arrival: 0, burst: 8, priority: 4 },
    ],
  },
  {
    key: "diff-arrival",
    label: "Different Arrival Time",
    hint: "Process มาถึงคนละเวลา เห็น CPU Idle ได้ชัดเจน",
    algorithm: "fcfs",
    quantum: 3,
    processes: [
      { id: "P1", arrival: 0, burst: 3, priority: 2 },
      { id: "P2", arrival: 4, burst: 4, priority: 1 },
      { id: "P3", arrival: 9, burst: 2, priority: 3 },
      { id: "P4", arrival: 12, burst: 5, priority: 2 },
    ],
  },
  {
    key: "short-jobs",
    label: "Short Jobs",
    hint: "Burst Time สั้นทั้งหมด — เห็น Throughput สูง",
    algorithm: "sjf",
    quantum: 1,
    processes: [
      { id: "P1", arrival: 0, burst: 2, priority: 2 },
      { id: "P2", arrival: 1, burst: 1, priority: 1 },
      { id: "P3", arrival: 2, burst: 3, priority: 3 },
      { id: "P4", arrival: 2, burst: 2, priority: 2 },
      { id: "P5", arrival: 3, burst: 1, priority: 1 },
    ],
  },
  {
    key: "long-jobs",
    label: "Long Jobs",
    hint: "Burst Time ยาว — เห็นผลของ Waiting Time ชัดเจน",
    algorithm: "fcfs",
    quantum: 4,
    processes: [
      { id: "P1", arrival: 0, burst: 12, priority: 2 },
      { id: "P2", arrival: 2, burst: 9, priority: 1 },
      { id: "P3", arrival: 4, burst: 15, priority: 3 },
    ],
  },
  {
    key: "rr-example",
    label: "Round Robin Example",
    hint: "ออกแบบมาให้เห็น Process ย้อนกลับเข้า Ready Queue หลายรอบ",
    algorithm: "rr",
    quantum: 2,
    processes: [
      { id: "P1", arrival: 0, burst: 5, priority: 2 },
      { id: "P2", arrival: 1, burst: 4, priority: 1 },
      { id: "P3", arrival: 2, burst: 6, priority: 3 },
      { id: "P4", arrival: 3, burst: 3, priority: 2 },
    ],
  },
  {
    key: "priority-example",
    label: "Priority Example",
    hint: "เลขน้อยแทน Priority สูงกว่า — เห็นการแซงคิว",
    algorithm: "priority",
    quantum: 2,
    processes: [
      { id: "P1", arrival: 0, burst: 4, priority: 3 },
      { id: "P2", arrival: 1, burst: 3, priority: 1 },
      { id: "P3", arrival: 2, burst: 2, priority: 4 },
      { id: "P4", arrival: 3, burst: 5, priority: 2 },
    ],
  },
];
