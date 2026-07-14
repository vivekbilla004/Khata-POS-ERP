import { Minus, Plus, Factory, Package, Layers } from "lucide-react";

export default function LoomCard({ item, updateTaka }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-3 rounded-t-2xl">

        <div className="flex items-center gap-2">

          <Factory className="text-blue-600" size={20} />

          <h2 className="font-semibold text-slate-800">
            Loom {item.loomNumber}
          </h2>

        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Running
        </span>

      </div>

      {/* Body */}

      <div className="space-y-4 p-4">

        {/* Beam */}

        <div className="flex justify-between">

          <div className="flex items-center gap-2">

            <Package size={18} className="text-slate-500" />

            <span className="text-slate-600">
              Beam
            </span>

          </div>

          <span className="font-semibold">
            {item.beamNumber}
          </span>

        </div>

        {/* Design */}

        <div className="flex justify-between">

          <div className="flex items-center gap-2">

            <Layers size={18} className="text-slate-500" />

            <span className="text-slate-600">
              Design
            </span>

          </div>

          <span className="font-semibold">
            {item.designNo || "-"}
          </span>

        </div>

        {/* Party */}

        <div className="flex justify-between">

          <span className="text-slate-600">
            Party
          </span>

          <span className="font-medium">
            {item.partyName}
          </span>

        </div>

        {/* Remaining */}

        <div className="flex justify-between">

          <span className="text-slate-600">
            Remaining Cuts
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {item.remainingCuts}
          </span>

        </div>

        {/* Production */}

        <div className="pt-2">

          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Today's Production
          </label>

          <div className="flex items-center justify-center gap-4">

            <button
              onClick={() =>
                updateTaka(
                  item._id,
                  Math.max(0, item.takaToday - 1)
                )
              }
              className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
            >
              <Minus size={20} />
            </button>

            <input
              type="number"
              min={0}
              max={item.remainingCuts}
              value={item.takaToday}
              onChange={(e) =>
                updateTaka(
                  item._id,
                  Math.min(
                    Number(e.target.value),
                    item.remainingCuts
                  )
                )
              }
              className="w-20 rounded-xl border border-slate-300 py-2 text-center text-lg font-semibold outline-none focus:border-blue-500"
            />

            <button
              onClick={() =>
                updateTaka(
                  item._id,
                  Math.min(
                    item.remainingCuts,
                    item.takaToday + 1
                  )
                )
              }
              className="rounded-xl bg-green-100 p-3 text-green-600 transition hover:bg-green-200"
            >
              <Plus size={20} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}