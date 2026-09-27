import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ALGORITHMS } from "../utils/calculations.js";

export default function ComparisonChart({ results }) {
  const rows = Object.entries(results).map(([key, r]) => ({
    key,
    label: ALGORITHMS[key].label,
    waiting: r.averages.waiting,
    turnaround: r.averages.turnaround,
    response: r.averages.response,
  }));

  return (
    <div className="compare-table-wrap">
      <div className="table-scroll" style={{ marginBottom: 20 }}>
        <table>
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Avg Waiting</th>
              <th>Avg Turnaround</th>
              <th>Avg Response</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td>{r.label}</td>
                <td>{r.waiting.toFixed(2)}</td>
                <td>{r.turnaround.toFixed(2)}</td>
                <td>{r.response.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-panel">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#223154" vertical={false} />
            <XAxis dataKey="label" stroke="#93a8cc" fontSize={12} />
            <YAxis stroke="#93a8cc" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "#16223a",
                border: "1px solid #223154",
                borderRadius: 8,
                fontSize: 12.5,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12.5 }} />
            <Bar dataKey="waiting" name="Avg Waiting" fill="#ff4fa3" radius={[4, 4, 0, 0]} />
            <Bar dataKey="turnaround" name="Avg Turnaround" fill="#3dcfff" radius={[4, 4, 0, 0]} />
            <Bar dataKey="response" name="Avg Response" fill="#33e3a5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
