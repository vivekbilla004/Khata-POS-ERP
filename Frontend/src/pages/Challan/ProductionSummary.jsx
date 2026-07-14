import {
  Package,
  Ruler,
  Factory,
  Boxes,
} from "lucide-react";

export default function ProductionSummary({
  totalTaka,
  allocations,
}) {
  const totalMeters = totalTaka * 110;

  // Temporary Calculation
  // Later we'll calculate from Yarn Master
  const estimatedYarn = (totalTaka * 5).toFixed(2);

  const runningLooms = allocations.filter(
    (item) => item.status === "Running"
  ).length;

  const cards = [
    {
      title: "Today's Taka",
      value: totalTaka,
      icon: Package,
      color: "bg-blue-100 text-blue-700",
    },

    {
      title: "Meters",
      value: `${totalMeters} m`,
      icon: Ruler,
      color: "bg-green-100 text-green-700",
    },

    {
      title: "Running Looms",
      value: runningLooms,
      icon: Factory,
      color: "bg-yellow-100 text-yellow-700",
    },

    {
      title: "Estimated Yarn",
      value: `${estimatedYarn} Kg`,
      icon: Boxes,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="mb-5">

        <h2 className="text-xl font-bold">
          Production Summary
        </h2>

        <p className="text-sm text-slate-500">
          Live production statistics
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="rounded-xl border bg-slate-50 p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`rounded-xl p-3 ${card.color}`}
                >
                  <Icon size={24} />
                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}