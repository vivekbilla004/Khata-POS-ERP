const styles = {
  Idle: "bg-slate-100 text-slate-700",

  Running: "bg-green-100 text-green-700",

  Maintenance: "bg-yellow-100 text-yellow-700",

  Completed: "bg-blue-100 text-blue-700",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}