import { useState } from "react";
import { Plus, Trash2, RotateCcw, Sparkles, Copy, Dices } from "lucide-react";
import { SAMPLE_PROCESSES } from "../utils/calculations.js";

function nextId(processes) {
  let n = processes.length + 1;
  const existing = new Set(processes.map((p) => p.id));
  while (existing.has(`P${n}`)) n++;
  return `P${n}`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ProcessInput({ processes, setProcesses, errors }) {
  const [genCount, setGenCount] = useState(5);

  const updateField = (idx, field, value) => {
    const next = [...processes];
    next[idx] = { ...next[idx], [field]: value };
    setProcesses(next);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: nextId(processes), arrival: 0, burst: 1, priority: 1 },
    ]);
  };

  const duplicateProcess = (idx) => {
    const next = [...processes];
    const source = next[idx];
    next.splice(idx + 1, 0, { ...source, id: nextId(processes) });
    setProcesses(next);
  };

  const removeProcess = (idx) => {
    setProcesses(processes.filter((_, i) => i !== idx));
  };

  const reset = () => setProcesses([]);

  const loadSample = () =>
    setProcesses(SAMPLE_PROCESSES.map((p) => ({ ...p })));

  const generateRandom = () => {
    const count = Math.max(1, Math.min(50, Math.round(genCount) || 1));
    const generated = Array.from({ length: count }, (_, i) => ({
      id: `P${i + 1}`,
      arrival: randomInt(0, count * 2),
      burst: randomInt(1, 10),
      priority: randomInt(1, 5),
    }));
    setProcesses(generated);
  };

  return (
    <div className="panel">
      <div className="process-row head">
        <span>Process ID</span>
        <span>Arrival Time</span>
        <span>Burst Time</span>
        <span>Priority</span>
        <span></span>
      </div>

      {processes.map((p, idx) => (
        <div className="process-row" key={idx}>
          <input
            type="text"
            value={p.id}
            onChange={(e) => updateField(idx, "id", e.target.value)}
            placeholder="P1"
          />
          <input
            type="number"
            min="0"
            value={p.arrival}
            onChange={(e) =>
              updateField(idx, "arrival", Number(e.target.value))
            }
          />
          <input
            type="number"
            min="1"
            value={p.burst}
            onChange={(e) => updateField(idx, "burst", Number(e.target.value))}
          />
          <input
            type="number"
            value={p.priority}
            onChange={(e) =>
              updateField(idx, "priority", Number(e.target.value))
            }
          />
          <div style={{ display: "flex", gap: 6 }}>
            <button
              className="icon-btn"
              onClick={() => duplicateProcess(idx)}
              aria-label={`ทำสำเนา ${p.id}`}
              title="ทำสำเนา Process นี้"
            >
              <Copy size={14} />
            </button>
            <button
              className="icon-btn"
              onClick={() => removeProcess(idx)}
              aria-label={`ลบ ${p.id}`}
              title="ลบ Process นี้"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}

      {processes.length === 0 && (
        <p style={{ color: "var(--text-dim)", fontSize: 13.5, margin: "6px 0 4px" }}>
          ยังไม่มี Process — เพิ่มเองหรือใช้ข้อมูลตัวอย่างด้านล่าง
        </p>
      )}

      <div className="row-actions">
        <button className="btn primary" onClick={addProcess}>
          <Plus size={15} /> Add Process
        </button>
        <button className="btn ghost" onClick={loadSample}>
          <Sparkles size={15} /> ใช้ข้อมูลตัวอย่าง
        </button>
        <button className="btn ghost" onClick={reset}>
          <RotateCcw size={15} /> Clear All
        </button>
      </div>

      <div className="generator-block">
        <label htmlFor="gen-count" className="generator-label">
          <Dices size={16} color="var(--text-dim)" />
          Random Process Generator — จำนวน Process
        </label>
        <div className="generator-controls">
          <input
            id="gen-count"
            type="number"
            min="1"
            max="50"
            value={genCount}
            onChange={(e) => setGenCount(Number(e.target.value))}
          />
          <button className="btn ghost" onClick={generateRandom}>
            <Dices size={15} /> Generate
          </button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="callout">
          <strong>ตรวจสอบข้อมูล Process ก่อนรัน Simulation:</strong>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}