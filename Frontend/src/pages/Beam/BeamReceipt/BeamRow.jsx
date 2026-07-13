import { Trash2 } from "lucide-react";

const BeamRow = ({
  beam,
  index,
  updateBeam,
  removeBeam,
  desktop,
}) => {
  // ------------------------------
  // Desktop Row
  // ------------------------------

  if (desktop) {
    return (
      <tr className="border-t hover:bg-slate-50 transition">

        {/* Sr No */}

        <td className="px-4 py-3 font-medium">
          {index + 1}
        </td>

        {/* Beam Number */}

        <td className="px-4 py-3">

          <input
            type="text"
            value={beam.beamNumber}
            placeholder="Beam No"
            onChange={(e) =>
              updateBeam(index, "beamNumber", e.target.value.toUpperCase())
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

        </td>

        {/* Cuts */}

        <td className="px-4 py-3">

          <input
            type="number"
            value={beam.totalCuts}
            placeholder="Cuts"
            onChange={(e) =>
              updateBeam(index, "totalCuts", e.target.value)
            }
            className="w-28 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

        </td>

        {/* Ends */}

        <td className="px-4 py-3">

          <input
            type="number"
            value={beam.ends}
            placeholder="Ends"
            onChange={(e) =>
              updateBeam(index, "ends", e.target.value)
            }
            className="w-36 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

        </td>

        {/* Delete */}

        <td className="px-4 py-3 text-center">

          <button
            onClick={() => removeBeam(index)}
            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200 transition"
          >
            <Trash2 size={18} />
          </button>

        </td>

      </tr>
    );
  }

  // ------------------------------
  // Mobile Card
  // ------------------------------

  return (
    <div className="rounded-xl border bg-white shadow-sm p-4 space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold">
          Beam #{index + 1}
        </h3>

        <button
          onClick={() => removeBeam(index)}
          className="rounded-lg bg-red-100 p-2 text-red-600"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Beam Number */}

      <div>

        <label className="block mb-1 text-sm font-medium">
          Beam Number
        </label>

        <input
          type="text"
          value={beam.beamNumber}
          placeholder="Beam Number"
          onChange={(e) =>
            updateBeam(index, "beamNumber", e.target.value.toUpperCase())
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />

      </div>

      {/* Cuts */}

      <div>

        <label className="block mb-1 text-sm font-medium">
          Cuts
        </label>

        <input
          type="number"
          value={beam.totalCuts}
          placeholder="Cuts"
          onChange={(e) =>
            updateBeam(index, "totalCuts", e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />

      </div>

      {/* Ends */}

      <div>

        <label className="block mb-1 text-sm font-medium">
          Ends
        </label>

        <input
          type="number"
          value={beam.ends}
          placeholder="Ends"
          onChange={(e) =>
            updateBeam(index, "ends", e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />

      </div>

    </div>
  );
}

export default BeamRow;