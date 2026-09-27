import { useState } from "react";
import { ALGORITHMS } from "../utils/calculations.js";
import { ALGORITHM_INFO } from "../data/algorithmInfo.js";

export default function AlgorithmInfo() {
  const [active, setActive] = useState("fcfs");
  const info = ALGORITHM_INFO[active];

  return (
    <div className="panel">
      <div className="algo-grid">
        {Object.entries(ALGORITHMS).map(([key, meta]) => (
          <div
            key={key}
            className={`algo-card ${active === key ? "active" : ""}`}
            onClick={() => setActive(key)}
          >
            <div className="name">{meta.label}</div>
            <div className="full">{meta.full}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 18 }} />

      <div className="algo-info-body">
        <h3 style={{ margin: 0, fontSize: 16 }}>
          {info.name} <span className="badge">{info.type}</span>
        </h3>
        <dl>
          <dt>คำอธิบาย</dt>
          <dd>{info.description}</dd>
          <dt>หลักการทำงาน</dt>
          <dd>{info.principle}</dd>
          <dt>ข้อควรสังเกต</dt>
          <dd>{info.notes}</dd>
          <dt>ตัวอย่าง</dt>
          <dd>{info.example}</dd>
        </dl>
      </div>
    </div>
  );
}
