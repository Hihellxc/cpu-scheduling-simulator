// Builds a CSV file from a result table and triggers a browser download.
// Pure utility — no UI concerns, so it can be unit-tested or reused by the
// print/report view without dragging component code along with it.

const COLUMNS = [
  ["id", "Process"],
  ["arrival", "Arrival"],
  ["burst", "Burst"],
  ["priority", "Priority"],
  ["start", "Start"],
  ["completion", "Completion"],
  ["waiting", "Waiting"],
  ["turnaround", "Turnaround"],
  ["response", "Response"],
];

export function tableToCsv(table) {
  const header = COLUMNS.map(([, label]) => label).join(",");
  const rows = [...table]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((row) => COLUMNS.map(([key]) => row[key]).join(","));
  return [header, ...rows].join("\n");
}

export function downloadCsv(table, filename) {
  const csv = tableToCsv(table);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
