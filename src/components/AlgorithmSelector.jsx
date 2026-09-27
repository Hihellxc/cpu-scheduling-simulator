import { ALGORITHMS } from "../utils/calculations.js";

export default function AlgorithmSelector({
  algorithm,
  setAlgorithm,
  quantum,
  setQuantum,
  compareAll,
  setCompareAll,
}) {
  return (
    <div className="panel">
      <div className="algo-grid">
        {Object.entries(ALGORITHMS).map(([key, meta]) => (
          <div
            key={key}
            className={`algo-card ${
              !compareAll && algorithm === key ? "active" : ""
            }`}
            onClick={() => {
              setAlgorithm(key);
              setCompareAll(false);
            }}
          >
            <div className="name">{meta.label}</div>
            <div className="full">
              {key === "priority" ? `${meta.full} · เลขน้อย = สำคัญกว่า` : meta.full}
            </div>
          </div>
        ))}
      </div>

      {(algorithm === "rr" || compareAll) && (
        <div className="quantum-field">
          <label htmlFor="quantum">Time Quantum (สำหรับ Round Robin)</label>
          <input
            id="quantum"
            type="number"
            min="1"
            value={quantum}
            onChange={(e) => setQuantum(Number(e.target.value))}
          />
        </div>
      )}

      <label className="compare-toggle">
        <input
          type="checkbox"
          checked={compareAll}
          onChange={(e) => setCompareAll(e.target.checked)}
        />
        Compare All — เปรียบเทียบทุก Algorithm พร้อมกัน
      </label>
    </div>
  );
}
