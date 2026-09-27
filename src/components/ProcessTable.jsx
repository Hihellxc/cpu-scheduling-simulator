export default function ProcessTable({ table }) {
  const rows = [...table].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival</th>
            <th>Burst</th>
            <th>Priority</th>
            <th>Start</th>
            <th>Completion</th>
            <th>Waiting</th>
            <th>Turnaround</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.arrival}</td>
              <td>{r.burst}</td>
              <td>{r.priority}</td>
              <td>{r.start}</td>
              <td>{r.completion}</td>
              <td>{r.waiting}</td>
              <td>{r.turnaround}</td>
              <td>{r.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
