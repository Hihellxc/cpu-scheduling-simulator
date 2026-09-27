# CPU Scheduling Simulator

Interactive CPU Scheduling Algorithm Visualization — จำลองการทำงานของ CPU
Scheduling แบบ Step-by-Step พร้อม Animation, Ready Queue, CPU View และ
Event Log ที่คำนวณจากอัลกอริทึมจริงทั้งหมด ไม่มีข้อมูล Hard-code

## 1. About

CPU Scheduling Simulator เป็นเว็บแอปพลิเคชันสำหรับจำลองและเปรียบเทียบ
อัลกอริทึมการจัดตาราง CPU (CPU Scheduling Algorithm) ผู้ใช้กำหนด Process
เอง (หรือใช้ Scenario สำเร็จรูป / Random Generator) ระบบจะคำนวณลำดับการ
ทำงานของ CPU จริงตามอัลกอริทึมที่เลือก แล้วนำเสนอผลลัพธ์ผ่าน Animation
แบบ Interactive — Process เคลื่อนที่ระหว่าง New → Ready Queue → CPU →
Completed ให้เห็นแบบเป็นขั้นตอน แทนที่จะแสดงเพียงตารางผลลัพธ์นิ่ง ๆ

## 2. Objectives

- ช่วยให้นักศึกษาวิชาระบบปฏิบัติการ (Operating Systems) เข้าใจหลักการทำงาน
  ของ CPU Scheduling ผ่านการมองเห็น Process เคลื่อนที่จริง ไม่ใช่แค่อ่านตาราง
- ให้ผู้ใช้เปรียบเทียบพฤติกรรมของอัลกอริทึมต่าง ๆ บนข้อมูล Process ชุดเดียวกัน
- แสดงการคำนวณ Waiting Time, Turnaround Time และ Response Time ทีละขั้นตอน
  อย่างถูกต้องตามหลักวิชา โดยอ้างอิงจาก Timeline ที่จำลองจริงเท่านั้น

## 3. Features

**Process & Scenario Management**
- เพิ่ม / แก้ไข / ทำสำเนา (Duplicate) / ลบ / Clear All Process ได้อย่างอิสระ
- Random Process Generator — สุ่มสร้าง Process ได้ตามจำนวนที่กำหนด (1–50 ตัว)
- Scenario / Preset สำเร็จรูป 7 แบบ: Basic, Same Arrival Time, Different
  Arrival Time, Short Jobs, Long Jobs, Round Robin Example, Priority Example
- ตรวจสอบความถูกต้องของข้อมูล (Validation) ก่อนรัน พร้อมข้อความแจ้งเตือน

**Interactive CPU Visualization**
- Process Card แสดงสถานะ NEW / READY / RUNNING / COMPLETED พร้อม Visual
  Highlight เมื่อ Process กำลังทำงาน
- Ready Queue แบบ Interactive เรียงลำดับตามคิวจริงของอัลกอริทึมที่เลือก
- CPU View แสดง Process ที่กำลังรัน, Remaining Time และ Progress Bar
- Gantt Chart แบบสัดส่วนเวลาจริง พร้อม Playhead และ CPU Idle Block
- Event Log แสดงเหตุการณ์ตามเวลาจริง (Arrival, Selected, Resumed, Requeued,
  Completed, Idle)
- ระบบ Animation ควบคุมได้: Play / Pause / Next Step / Previous Step /
  Reset พร้อม Speed Control 0.5x / 1x / 2x / 4x และ Scrub Bar
- รองรับ `prefers-reduced-motion` — ปิด Animation ที่ยาวและเปลี่ยนสถานะทันที

**Algorithms & Analysis**
- จำลองอัลกอริทึม FCFS, SJF (Non-Preemptive), Round Robin (Preemptive)
  และ Priority Scheduling (Non-Preemptive)
- โหมด Compare All เพื่อรันทุกอัลกอริทึมพร้อมกันด้วยข้อมูล Process เดียวกัน
  พร้อม Bar Chart เปรียบเทียบ (ไม่มีการชี้ว่าอัลกอริทึมใด "ดีที่สุด")
- Statistics Card: Average Waiting / Turnaround / Response Time, CPU
  Utilization และ Total Execution Time
- Algorithm Information — คำอธิบาย หลักการทำงาน ประเภท Preemptive /
  Non-Preemptive ข้อควรสังเกต และตัวอย่างของแต่ละอัลกอริทึม
- Export CSV ของผลลัพธ์ Process ทั้งหมด

## 4. Scheduling Algorithms

**FCFS (First Come, First Served)** — Non-preemptive
Process ที่มี Arrival Time น้อยที่สุดจะได้ CPU ก่อนและทำงานจนเสร็จ

**SJF (Shortest Job First)** — Non-preemptive
เมื่อ CPU ว่าง จะเลือก Process ที่มาถึงแล้วและมี Burst Time สั้นที่สุด

**Round Robin** — Preemptive
แบ่งเวลา CPU เป็นช่วงตาม Time Quantum แล้วหมุนให้ทุก Process ได้ใช้ CPU
ตามลำดับคิว โดย Process ที่มาถึงใหม่ระหว่างรอบจะถูกเข้าคิวก่อน Process
ที่ใช้ Quantum หมดแล้วถูกส่งกลับเข้าคิว

**Priority Scheduling** — Non-preemptive
เลือก Process ตามค่า Priority โดย **เลขน้อยกว่า = สำคัญกว่า**

## 5. Scheduling Rules

- SJF ใช้แบบ **Non-Preemptive** — Process ที่เริ่มรันแล้วจะรันจนจบเสมอ
- Priority Scheduling ใช้แบบ **Non-Preemptive**
- Priority: **Priority Number ที่น้อยกว่า = Priority สูงกว่า**
- Round Robin ใช้ **Time Quantum** ที่ผู้ใช้กำหนดได้ (ค่าเริ่มต้น = 2)
- ทุก Algorithm ใช้ Arrival Time / Process ID เป็น Tie Breaker ตามลำดับ
  เมื่อค่าตัดสินหลักเท่ากัน

## 6. Metrics

```
Turnaround Time = Completion Time − Arrival Time
Waiting Time    = Turnaround Time − Burst Time
Response Time   = First Start Time − Arrival Time
```

ค่าเฉลี่ย (Average Waiting / Turnaround / Response Time), CPU Utilization
(% ของเวลาที่ CPU ไม่ Idle) และ Throughput คำนวณจาก Timeline ที่จำลองจริง
ทั้งหมด ไม่มีการ Hard-code ค่าใด ๆ

## 7. Animation System

- **Play / Pause / Next Step / Previous Step / Reset** — ควบคุม Playhead
  ของ Simulation ทีละหน่วยเวลา
- **Speed Control**: 0.5x, 1x, 2x, 4x
- **Ready Queue** — อัปเดตลำดับ Process ที่รอ CPU ตามผลจริงของอัลกอริทึม
  ที่เลือก (ไม่ใช่ลำดับ FIFO ตายตัว)
- **CPU Visualization** — Highlight Process ที่กำลังรัน แสดง Remaining
  Time และ Progress Bar พร้อม Transition เมื่อเปลี่ยน Process
- **Gantt Chart** — แสดง Segment ที่ผ่านไปแล้วแบบชัดเจนและ Segment ที่ยัง
  ไม่ถึงแบบจาง (Dimmed) พร้อม Playhead เคลื่อนที่ตามเวลาจริง
- Logic ของ Algorithm และ Animation แยกจากกันอย่างเด็ดขาด — Animation เป็น
  เพียงการนำเสนอผลจาก `src/algorithms/*` และ `src/simulation/simulationEngine.js`
  เท่านั้น ไม่มีการสร้าง State ปลอมสำหรับ Animation

## 8. Technologies

- React 18 + Vite
- JavaScript (ES Modules)
- CSS (Custom Properties / Design Tokens ในไฟล์เดิม `src/index.css`)
- [Recharts](https://recharts.org/) — Bar Chart สำหรับ Performance Comparison
- [lucide-react](https://lucide.dev/) — ไอคอน

## 9. Installation

```bash
npm install
```

ไม่มี Library เพิ่มเติมนอกเหนือจาก `package.json` ที่มีอยู่แล้ว

## 10. Run Project

```bash
npm run dev
```

Build สำหรับ Production:

```bash
npm run build
npm run preview
```

## 11. How to Use

1. เลือก Scenario / Preset สำเร็จรูป **หรือ** เพิ่ม Process เอง **หรือ**
   ใช้ Random Process Generator
2. กำหนด Arrival Time, Burst Time และ Priority ของแต่ละ Process
3. เลือก Algorithm (FCFS / SJF / Round Robin / Priority)
4. กำหนด Time Quantum หากเลือก Round Robin
5. กด **Run Simulation** เพื่อคำนวณผลจริง
6. ดู Process Card, Ready Queue และ CPU Visualization ที่ส่วน Interactive
   CPU Visualization
7. กด **Play** เพื่อดู Animation อัตโนมัติ หรือใช้ **Next / Previous Step**
   เพื่อดูทีละขั้นตอน ปรับ Speed ได้ตามต้องการ
8. ดู Gantt Chart ที่ค่อย ๆ เผยขึ้นตาม Playhead
9. ตรวจสอบ Event Log เพื่อดูลำดับเหตุการณ์ทั้งหมด
10. ดู Statistics และตาราง Process Results ในส่วน Process Results
11. เปิด **Compare All** แล้วกด Run Simulation อีกครั้งเพื่อเปรียบเทียบ
    ทุก Algorithm พร้อมกัน
12. อ่าน Algorithm Information เพื่อทบทวนหลักการของแต่ละ Algorithm
13. กด **Export CSV** เพื่อบันทึกผลลัพธ์ไปใช้ต่อ

## 12. Project Structure

```
src/
├── algorithms/            # Scheduling logic — คำนวณล้วน ไม่ยุ่งกับ UI
│   ├── fcfs.js
│   ├── sjf.js
│   ├── roundRobin.js
│   └── priority.js
├── simulation/
│   ├── simulationEngine.js  # derive process state / ready queue / event log
│   └── useTimeline.js       # play/pause/step/speed timeline controller
├── data/
│   ├── scenarios.js         # Preset Scenario datasets
│   └── algorithmInfo.js     # ข้อความอธิบายแต่ละ Algorithm
├── utils/
│   ├── calculations.js      # simulate(), metrics, colors, validation
│   └── export.js            # CSV export
├── components/
│   ├── Header.jsx
│   ├── ScenarioPicker.jsx
│   ├── ProcessInput.jsx
│   ├── AlgorithmSelector.jsx
│   ├── SimulationStage.jsx  # ประกอบหน้า Visualization ทั้งหมด
│   ├── ProcessStage.jsx     # Process Cards
│   ├── ReadyQueue.jsx
│   ├── CPUView.jsx
│   ├── GanttChart.jsx
│   ├── GanttPlayer.jsx      # ใช้ในโหมด Compare All
│   ├── PlayerControls.jsx
│   ├── EventLog.jsx
│   ├── ProcessTable.jsx
│   ├── Statistics.jsx
│   ├── ComparisonChart.jsx
│   ├── AlgorithmInfo.jsx
│   └── Collapsible.jsx
├── App.jsx
├── main.jsx
└── index.css                # Design System เดิมของ Project (ไม่เปลี่ยนสี)
```

## 13. Example

```
P1: AT=0 BT=5 Priority=2
P2: AT=1 BT=3 Priority=1
P3: AT=2 BT=8 Priority=3
P4: AT=3 BT=2 Priority=2
```

รันด้วย FCFS → ลำดับ P1, P2, P3, P4 (ตาม Arrival) → Average Waiting Time,
Turnaround Time และ Response Time จะแสดงในส่วน Statistics ทันทีหลังกด
Run Simulation

## 14. Requirements

- Node.js 18+
- npm
- เบราว์เซอร์สมัยใหม่ (Chrome, Edge, Firefox, Safari รุ่นล่าสุด)

## 15. Team Responsibilities

แบ่งงานสำหรับทีม 5 คน:

| คนที่ | ความรับผิดชอบ |
|---|---|
| Person 1 | Algorithm: FCFS + SJF (`src/algorithms/fcfs.js`, `sjf.js`) |
| Person 2 | Algorithm: Round Robin + Priority (`src/algorithms/roundRobin.js`, `priority.js`) |
| Person 3 | Animation Engine + CPU View + Ready Queue + Step Simulation (`src/simulation/`, `CPUView.jsx`, `ReadyQueue.jsx`, `SimulationStage.jsx`) |
| Person 4 | Gantt Chart + Statistics + Comparison + Chart (`GanttChart.jsx`, `GanttPlayer.jsx`, `Statistics.jsx`, `ComparisonChart.jsx`) |
| Person 5 | UI/UX + Process Management + Export + README + Testing (`ProcessInput.jsx`, `ScenarioPicker.jsx`, `utils/export.js`, เอกสาร) |

ทุกส่วนสื่อสารกันผ่านโครงสร้างข้อมูลกลาง (`segments`, `table`, `totalTime`
จาก `simulate()`) จึงพัฒนาแยกกันได้โดยไม่ชนกัน
