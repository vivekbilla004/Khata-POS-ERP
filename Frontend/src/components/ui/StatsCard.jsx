export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",

    green: "bg-green-100 text-green-700",

    yellow: "bg-yellow-100 text-yellow-700",

    red: "bg-red-100 text-red-700",

    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-xl p-4 ${colors[color]}`}
        >
          <Icon size={28} />
        </div>

      </div>

    </div>
  );
}