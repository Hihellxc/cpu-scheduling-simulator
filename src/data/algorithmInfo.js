export const ALGORITHM_INFO = {
  fcfs: {
    name: "First Come, First Served (FCFS)",
    type: "Non-Preemptive",
    description:
      "จัดสรร CPU ให้ Process ที่มาถึง (Arrival Time) ก่อนเสมอ โดยรันจนเสร็จก่อนจึงเลือก Process ถัดไป",
    principle:
      "เรียง Process ตาม Arrival Time จากน้อยไปมาก แล้วให้ CPU ทำงานตามลำดับนั้นทีละตัวจนจบ Burst Time หากถึงเวลาแล้วไม่มี Process มาถึง CPU จะ Idle จนกว่า Process ถัดไปจะมาถึง",
    notes:
      "ง่ายต่อการเข้าใจและ Implement แต่อาจเกิด Convoy Effect — Process สั้นต้องรอ Process ยาวที่มาก่อนจบก่อน ทำให้ Waiting Time เฉลี่ยสูงในบางกรณี",
    example: "P1 (AT=0, BT=5) → P2 (AT=1, BT=3) → P3 (AT=2, BT=8) : รันเรียงตาม Arrival คือ P1, P2, P3",
  },
  sjf: {
    name: "Shortest Job First (SJF)",
    type: "Non-Preemptive",
    description:
      "ทุกครั้งที่ CPU ว่าง จะเลือก Process ที่มาถึงแล้วและมี Burst Time สั้นที่สุดมารันจนจบ",
    principle:
      "เมื่อ CPU ว่าง ให้ดูกลุ่ม Process ที่ Arrival Time ≤ เวลาปัจจุบัน แล้วเลือกตัวที่ Burst Time น้อยที่สุด ถ้า Burst Time เท่ากันให้ใช้ Arrival Time ก่อนเป็นตัวตัดสิน (Tie Breaker)",
    notes:
      "ให้ Average Waiting Time ต่ำที่สุดในทางทฤษฎีสำหรับชุด Process คงที่ แต่ Process ยาวอาจถูกแซงคิวเรื่อย ๆ (Starvation) หาก Process สั้นมาถึงต่อเนื่อง",
    example: "P1 (BT=6) และ P2 (BT=2) มาถึงพร้อมกัน : เลือก P2 ก่อนเพราะ Burst Time สั้นกว่า",
  },
  rr: {
    name: "Round Robin",
    type: "Preemptive",
    description:
      "แบ่งเวลา CPU ให้แต่ละ Process ครั้งละเท่า ๆ กัน ตามค่า Time Quantum ที่กำหนด แล้ววนกลับเข้าคิวหากยังทำงานไม่เสร็จ",
    principle:
      "ดึง Process หัวคิวออกมารันไม่เกิน Time Quantum ที่ตั้งไว้ หากยังเหลืองานให้กลับไปต่อท้ายคิว ส่วน Process ที่มาถึงใหม่ระหว่างนั้นจะถูกเพิ่มเข้าคิวก่อน Process ที่เพิ่งใช้ Quantum หมด",
    notes:
      "ยุติธรรมกับทุก Process และ Response Time ต่ำ เหมาะกับระบบ Time-Sharing แต่ถ้า Time Quantum เล็กเกินไปจะเสีย Overhead จากการสลับ Process บ่อย ถ้าใหญ่เกินไปจะพฤติกรรมใกล้เคียง FCFS",
    example: "Time Quantum = 2 : P1 → CPU 2 หน่วย → กลับเข้าคิว → P2 → CPU 2 หน่วย → ... วนไปจนทุก Process เสร็จ",
  },
  priority: {
    name: "Priority Scheduling",
    type: "Non-Preemptive",
    description:
      "เลือก Process ที่มาถึงแล้วและมีค่า Priority สูงสุดมารันก่อนเสมอ โดยกำหนดให้เลขน้อยกว่า = Priority สูงกว่า",
    principle:
      "เมื่อ CPU ว่าง ให้ดู Process ที่ Arrival Time ≤ เวลาปัจจุบัน แล้วเลือกตัวที่ค่า Priority Number น้อยที่สุด (สูงสุด) ถ้า Priority เท่ากันให้ใช้ Arrival Time แล้วจึง Process ID เป็น Tie Breaker",
    notes:
      "Process ที่มี Priority ต่ำ (เลขมาก) อาจต้องรอนานหรือเกิด Starvation หากมี Process Priority สูงมาถึงต่อเนื่อง ระบบจริงมักแก้ด้วยเทคนิค Aging",
    example: "P1 (Priority=3) และ P2 (Priority=1) : เลือก P2 ก่อนเพราะเลขน้อยกว่าหมายถึง Priority สูงกว่า",
  },
};
