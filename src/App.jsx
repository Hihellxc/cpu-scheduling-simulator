import { useEffect, useState } from "react";
import { Play, Layers, RotateCcw, Download } from "lucide-react";
import Header from "./components/Header.jsx";
import ProcessInput from "./components/ProcessInput.jsx";
import ScenarioPicker from "./components/ScenarioPicker.jsx";
import AlgorithmSelector from "./components/AlgorithmSelector.jsx";
import SimulationStage from "./components/SimulationStage.jsx";
import GanttPlayer from "./components/GanttPlayer.jsx";
import ProcessTable from "./components/ProcessTable.jsx";
import Statistics from "./components/Statistics.jsx";
import ComparisonChart from "./components/ComparisonChart.jsx";
import AlgorithmInfo from "./components/AlgorithmInfo.jsx";
import Collapsible from "./components/Collapsible.jsx";
import { downloadCsv } from "./utils/export.js";
import {
  ALGORITHMS,
  SAMPLE_PROCESSES,
  simulate,
  validateProcesses,
} from "./utils/calculations.js";

export default function App() {
  const [processes, setProcesses] = useState(
    SAMPLE_PROCESSES.map((p) => ({ ...p }))
  );
  const [algorithm, setAlgorithm] = useState("fcfs");
  const [quantum, setQuantum] = useState(2);
  const [compareAll, setCompareAll] = useState(false);
  const [errors, setErrors] = useState([]);
  const [output, setOutput] = useState(null);

  // Any change to inputs invalidates the last run — results must come from
  // an explicit "Run Simulation" click, never stale or hard-coded.
  useEffect(() => {
    setOutput(null);
  }, [processes, algorithm, quantum, compareAll]);

  const processIds = processes.map((p) => p.id);

  const runSimulation = () => {
    const errs = validateProcesses(processes);
    setErrors(errs);
    if (errs.length > 0) {
      setOutput(null);
      return;
    }

    if (compareAll) {
      const keys = ["fcfs", "sjf", "rr", "priority"];
      const results = {};
      keys.forEach((k) => {
        results[k] = simulate(k, processes, quantum);
      });
      setOutput({ mode: "compare", results });
    } else {
      setOutput({ mode: "single", result: simulate(algorithm, processes, quantum) });
    }
  };

  const resetSimulation = () => {
    setAlgorithm("fcfs");
    setQuantum(2);
    setCompareAll(false);
    setErrors([]);
    setOutput(null);
  };

  const loadScenario = (scenario) => {
    setProcesses(scenario.processes.map((p) => ({ ...p })));
    setAlgorithm(scenario.algorithm);
    setQuantum(scenario.quantum);
    setCompareAll(false);
    setErrors([]);
    setOutput(null);
  };

  return (
    <div className="main">
      <Header />

      <section id="sec-scenario">
        <div className="section-head">
          <span className="idx">01</span>
          <h2>Scenario / Preset</h2>
          <span className="hint">เลือกชุดข้อมูลสำเร็จรูปเพื่อโหลดอัตโนมัติ</span>
        </div>
        <div className="panel">
          <ScenarioPicker onSelect={loadScenario} />
        </div>
      </section>

      <section id="sec-input">
        <div className="section-head">
          <span className="idx">02</span>
          <h2>Process Configuration</h2>
        </div>
        <ProcessInput
          processes={processes}
          setProcesses={setProcesses}
          errors={errors}
        />
      </section>

      <section id="sec-config">
        <div className="section-head">
          <span className="idx">03</span>
          <h2>Scheduling Configuration</h2>
        </div>
        <AlgorithmSelector
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          quantum={quantum}
          setQuantum={setQuantum}
          compareAll={compareAll}
          setCompareAll={setCompareAll}
        />
      </section>

      <section id="sec-run">
        <div className="section-head">
          <span className="idx">04</span>
          <h2>Simulation</h2>
        </div>
        <div className="panel action-row">
          <button className="btn primary" onClick={runSimulation}>
            <Play size={15} /> Run Simulation
          </button>
          <button
            className={`btn ${compareAll ? "primary" : "ghost"}`}
            onClick={() => setCompareAll((v) => !v)}
          >
            <Layers size={15} /> Compare All
          </button>
          <button className="btn ghost" onClick={resetSimulation}>
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </section>

      <section id="sec-gantt">
        <div className="section-head">
          <span className="idx">05</span>
          <h2>Interactive CPU Visualization</h2>
          {!output && <span className="hint">รอผลจาก Run Simulation</span>}
        </div>
        {!output && (
          <div className="panel" style={{ color: "var(--text-dim)", fontSize: 13.5 }}>
            กด Run Simulation ในหัวข้อก่อนหน้าเพื่อดู Process, Ready Queue, CPU และ
            Gantt Chart เคลื่อนไหวแบบ Step-by-Step
          </div>
        )}
        {output?.mode === "single" && (
          <SimulationStage
            algorithm={algorithm}
            quantum={quantum}
            result={output.result}
            processIds={processIds}
          />
        )}
        {output?.mode === "compare" && (
          <div className="panel">
            {Object.entries(output.results).map(([key, r]) => (
              <GanttPlayer
                key={key}
                title={ALGORITHMS[key].label}
                segments={r.segments}
                totalTime={r.totalTime}
                processIds={processIds}
                table={r.table}
              />
            ))}
          </div>
        )}
      </section>

      <section id="sec-results">
        <div className="section-head">
          <span className="idx">06</span>
          <h2>Process Results</h2>
        </div>
        {!output && (
          <div className="panel" style={{ color: "var(--text-dim)", fontSize: 13.5 }}>
            ยังไม่มีผลลัพธ์ — รัน Simulation ก่อน
          </div>
        )}
        {output?.mode === "single" && (
          <div className="panel">
            <Statistics result={output.result} />
            <div style={{ height: 18 }} />
            <ProcessTable table={output.result.table} />
            <div className="row-actions">
              <button
                className="btn ghost"
                onClick={() => downloadCsv(output.result.table, `${algorithm}-result.csv`)}
              >
                <Download size={15} /> Export CSV
              </button>
            </div>
          </div>
        )}
        {output?.mode === "compare" &&
          Object.entries(output.results).map(([key, r]) => (
            <div className="panel" key={key} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-2)",
                  fontSize: 13,
                  marginBottom: 12,
                }}
              >
                {ALGORITHMS[key].label}
              </div>
              <Statistics result={r} />
              <div style={{ height: 18 }} />
              <ProcessTable table={r.table} />
              <div className="row-actions">
                <button
                  className="btn ghost"
                  onClick={() => downloadCsv(r.table, `${key}-result.csv`)}
                >
                  <Download size={15} /> Export CSV
                </button>
              </div>
            </div>
          ))}
      </section>

      <section id="sec-compare">
        <Collapsible
          idx="07"
          title="Performance Comparison"
          defaultOpen={false}
          badge={output?.mode === "compare" ? "พร้อมดู" : "กด Compare All ก่อน"}
        >
          {output?.mode === "compare" ? (
            <div className="panel">
              <ComparisonChart results={output.results} />
            </div>
          ) : (
            <div className="panel" style={{ color: "var(--text-dim)", fontSize: 13.5 }}>
              เปิด "Compare All" แล้วกด Run Simulation เพื่อเปรียบเทียบทุก
              Algorithm พร้อมกัน — ผลลัพธ์เป็นข้อมูลดิบสำหรับให้คุณวิเคราะห์เอง
              ไม่มีการจัดอันดับว่า Algorithm ใด "ดีที่สุด"
            </div>
          )}
        </Collapsible>
      </section>

      <section id="sec-algo-info">
        <Collapsible idx="08" title="Algorithm Information" defaultOpen={false}>
          <AlgorithmInfo />
        </Collapsible>
      </section>
    </div>
  );
}
