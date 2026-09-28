<div align="center">

# 🖥️ CPU Scheduling Simulator

**An interactive CPU scheduling algorithm visualizer** ⚡

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=black)
![Recharts](https://img.shields.io/badge/Recharts-Charts-22B5BF)

🌐 **[Live Demo](https://hihellxc.github.io/cpu-scheduling-simulator/)**

</div>

---

Simulates CPU scheduling step by step, with animation, a Ready Queue, a CPU View, and an Event Log, all computed from the real algorithms with **no hard-coded data**. 🎯

## 📖 1. About

CPU Scheduling Simulator is a web application for simulating and comparing CPU scheduling algorithms. Users define their own processes (or use a preset scenario or the random generator). The system computes the actual CPU execution order for the selected algorithm and presents the result through an interactive animation.

Processes move step by step through:

🆕 New → 📋 Ready Queue → ⚙️ CPU → ✅ Completed

instead of appearing only as a static result table.

## 🎯 2. Objectives

- 🎓 Help Operating Systems students understand how CPU scheduling works by watching processes move, rather than just reading tables.
- ⚖️ Let users compare the behavior of different algorithms on the same set of processes.
- 🧮 Show the calculation of Waiting Time, Turnaround Time, and Response Time step by step, accurately and based only on the simulated timeline.

## ✨ 3. Features

### 🗂️ Process & Scenario Management
- ➕ Freely add / ✏️ edit / 📑 duplicate / 🗑️ delete processes, or clear all.
- 🎲 Random Process Generator: create 1–50 processes at a time.
- 📦 7 preset scenarios: Basic, Same Arrival Time, Different Arrival Time, Short Jobs, Long Jobs, Round Robin Example, Priority Example.
- 🛡️ Input validation before running, with clear warning messages.

### 🎬 Interactive CPU Visualization
- 🃏 Process Cards show 🆕 NEW / 🟡 READY / 🟢 RUNNING / ✅ COMPLETED states, with a visual highlight on the running process.
- 📋 Interactive Ready Queue, ordered by the real queue of the selected algorithm.
- ⚙️ CPU View shows the running process, its remaining time, and a progress bar.
- 📊 Gantt Chart with proportional time scale, a playhead, and CPU Idle blocks.
- 📝 Event Log showing real-time events (Arrival, Selected, Resumed, Requeued, Completed, Idle).
- ▶️ Animation controls: Play / Pause / Next Step / Previous Step / Reset, Speed Control (0.5x / 1x / 2x / 4x), and a scrub bar.
- ♿ Supports `prefers-reduced-motion`: long animations are disabled and state changes are applied instantly.

### 📈 Algorithms & Analysis
- 🧠 Simulates FCFS, SJF (Non-Preemptive), Round Robin (Preemptive), and Priority Scheduling (Non-Preemptive).
- 🆚 Compare All mode runs every algorithm on the same process data, with a comparison bar chart (it does not declare any algorithm the "best").
- 📉 Statistics Card: Average Waiting / Turnaround / Response Time, CPU Utilization, and Total Execution Time.
- 📚 Algorithm Information: description, how it works, Preemptive / Non-Preemptive type, things to note, and an example for each algorithm.
- 💾 Export all process results as CSV.

## 🧩 4. Scheduling Algorithms

| Algorithm | Type | How it works |
|---|---|---|
| 🥇 **FCFS** (First Come, First Served) | Non-preemptive | The process with the earliest Arrival Time gets the CPU first and runs to completion. |
| ⚡ **SJF** (Shortest Job First) | Non-preemptive | When the CPU becomes free, it picks the arrived process with the shortest Burst Time. |
| 🔄 **Round Robin** | Preemptive | CPU time is divided into slices of one Time Quantum, and each process takes turns in queue order. A process that arrives during a slice enters the queue before the process whose quantum just expired is requeued. |
| 👑 **Priority Scheduling** | Non-preemptive | Selects processes by Priority value, where **a lower number means higher priority**. |

## 📏 5. Scheduling Rules

- 🔒 SJF is **Non-Preemptive**: once a process starts, it always runs to completion.
- 🔒 Priority Scheduling is **Non-Preemptive**.
- 🏅 Priority: **a lower Priority Number means higher priority**.
- ⏱️ Round Robin uses a user-defined **Time Quantum** (default = 2).
- 🤝 All algorithms use Arrival Time, then Process ID, as tie-breakers when the primary criterion is equal.

## 🧮 6. Metrics

The averages (Waiting / Turnaround / Response Time), CPU Utilization (% of time the CPU is not idle), and Throughput are all computed from the actual simulated timeline. Nothing is hard-coded. ✅

## 🎞️ 7. Animation System

- ⏯️ **Play / Pause / Next Step / Previous Step / Reset**: control the simulation playhead one time unit at a time.
- 🚀 **Speed Control**: 0.5x, 1x, 2x, 4x.
- 📋 **Ready Queue**: updates the order of waiting processes from the real result of the selected algorithm (not a fixed FIFO order).
- ⚙️ **CPU Visualization**: highlights the running process, shows remaining time and a progress bar, with a transition when the process changes.
- 📊 **Gantt Chart**: elapsed segments are shown clearly and upcoming segments are dimmed, with the playhead moving in real time.
- 🧱 Algorithm logic and animation are strictly separated. The animation only presents results from `src/algorithms/*` and `src/simulation/simulationEngine.js`; no fake state is created for animation.

## 🛠️ 8. Technologies

- ⚛️ React 18 + Vite
- 📜 JavaScript (ES Modules)
- 🎨 CSS (Custom Properties / Design Tokens in the existing `src/index.css`)
- 📊 [Recharts](https://recharts.org/): Bar Chart for performance comparison
- 🖼️ [lucide-react](https://lucide.dev/): icons

## 📦 9. Installation

```bash
npm install
```

No libraries are needed beyond what is already in `package.json`.

## ▶️ 10. Run Project

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## 🚀 11. How to Use

1. 📦 Choose a preset scenario, **or** ➕ add processes manually, **or** 🎲 use the Random Process Generator.
2. ✏️ Set the Arrival Time, Burst Time, and Priority of each process.
3. 🧠 Select an algorithm (FCFS / SJF / Round Robin / Priority).
4. ⏱️ Set the Time Quantum if you chose Round Robin.
5. ▶️ Click **Run Simulation** to compute the real result.
6. 👀 View the Process Cards, Ready Queue, and CPU Visualization in the Interactive CPU Visualization section.
7. ⏯️ Click **Play** to watch the animation automatically, or use **Next / Previous Step** to go step by step. Adjust the speed as needed.
8. 📊 Watch the Gantt Chart reveal itself along the playhead.
9. 📝 Check the Event Log for the full sequence of events.
10. 📉 See the Statistics and the Process Results table in the Process Results section.
11. 🆚 Turn on **Compare All** and click Run Simulation again to compare all algorithms at once.
12. 📚 Read Algorithm Information to review how each algorithm works.
13. 💾 Click **Export CSV** to save the results for later use.


Running with FCFS gives the order **P1 → P2 → P3 → P4** (by arrival). The Average Waiting Time, Turnaround Time, and Response Time appear in the Statistics section right after you click Run Simulation. 🎉

## 📋 12. Requirements

- 🟢 Node.js 18+
- 📦 npm
- 🌐 A modern browser (latest Chrome, Edge, Firefox, or Safari)

## 👥 14. Team Responsibilities

Work split for a team of 5:

| Person | Responsibility |
|---|---|
| 👤 Person 1 | Algorithms: FCFS + SJF (`src/algorithms/fcfs.js`, `sjf.js`) |
| 👤 Person 2 | Algorithms: Round Robin + Priority (`src/algorithms/roundRobin.js`, `priority.js`) |
| 👤 Person 3 | Animation Engine + CPU View + Ready Queue + Step Simulation (`src/simulation/`, `CPUView.jsx`, `ReadyQueue.jsx`, `SimulationStage.jsx`) |
| 👤 Person 4 | Gantt Chart + Statistics + Comparison + Charts (`GanttChart.jsx`, `GanttPlayer.jsx`, `Statistics.jsx`, `ComparisonChart.jsx`) |
| 👤 Person 5 | UI/UX + Process Management + Export + README + Testing (`ProcessInput.jsx`, `ScenarioPicker.jsx`, `utils/export.js`, documentation) |

All parts communicate through a shared data structure (`segments`, `table`, `totalTime` from `simulate()`), so they can be developed independently without conflicts. 🤝