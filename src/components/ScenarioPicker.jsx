import { useEffect, useRef, useState } from "react";
import { SCENARIOS } from "../data/scenarios.js";

export default function ScenarioPicker({ onSelect }) {
  const [selectedKey, setSelectedKey] = useState(null);
  const [toast, setToast] = useState(null); // { id, label }
  const timeoutRef = useRef(null);
  const toastIdRef = useRef(0);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleSelect = (s) => {
    setSelectedKey(s.key);
    onSelect(s);

    toastIdRef.current += 1;
    setToast({ id: toastIdRef.current, label: s.label });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="scenario-picker">
      <div className="scenario-grid">
        {SCENARIOS.map((s) => {
          const isSelected = selectedKey === s.key;
          return (
            <div
              className={`scenario-card ${isSelected ? "active" : ""}`}
              key={s.key}
              onClick={() => handleSelect(s)}
            >
              {isSelected && <span className="scenario-check">✓</span>}
              <div className="name">{s.label}</div>
              <div className="hint">{s.hint}</div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div className="scenario-toast" key={toast.id}>
          ✓ โหลดชุดข้อมูล "{toast.label}" แล้ว
        </div>
      )}
    </div>
  );
}