export default function Statistics({ result }) {
  const { averages, totalTime, utilization } = result;

  return (
    <div className="stat-cards">
      <div className="stat-card">
        <div className="label">Avg Waiting Time</div>
        <div className="value" style={{ color: "var(--accent)" }}>
          {averages.waiting.toFixed(2)}
        </div>
      </div>
      <div className="stat-card">
        <div className="label">Avg Turnaround Time</div>
        <div className="value" style={{ color: "var(--accent-2)" }}>
          {averages.turnaround.toFixed(2)}
        </div>
      </div>
      <div className="stat-card">
        <div className="label">Avg Response Time</div>
        <div className="value" style={{ color: "var(--good)" }}>
          {averages.response.toFixed(2)}
        </div>
      </div>
      <div className="stat-card">
        <div className="label">Total Execution Time</div>
        <div className="value" style={{ color: "var(--text)" }}>
          {totalTime}
          <span style={{ fontSize: 13, color: "var(--text-dim)" }}>
            {" "}
            · {utilization}% util
          </span>
        </div>
      </div>
    </div>
  );
}
