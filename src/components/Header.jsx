export default function Header() {
  return (
    <div className="hero">
      <h1>CPU Scheduling Simulator</h1>
      <p>
        Interactive CPU Scheduling Algorithm Visualization — กำหนด Process
        แล้วดูว่า FCFS, SJF, Round Robin และ Priority Scheduling จัดลำดับ CPU
        ต่างกันอย่างไร พร้อม Gantt Chart และค่า Waiting / Turnaround /
        Response Time ที่คำนวณจริงทุกตัว
      </p>
    </div>
  );
}
