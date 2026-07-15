import { Trash2 } from "lucide-react";

    const BeamRow = ({
  index,
  beam,
  handleBeamChange,
  removeBeam,
  disableDelete,
}) => {
  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-3 py-3 text-center font-medium">{index + 1}</td>

      <td className="px-3 py-2">
        <input
          type="text"
          placeholder="Beam No"
          value={beam.beamNumber}
          onChange={(e) =>
            handleBeamChange(index, "beamNumber", e.target.value.toUpperCase())
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-3 py-2">
        <input
          type="text"
          placeholder="3044"
          value={beam.designNo}
          onChange={(e) => handleBeamChange(index, "designNo", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-3 py-2">
        <input
          type="number"
          placeholder="4200"
          value={beam.ends}
          onChange={(e) => handleBeamChange(index, "ends", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-3 py-2">
        <input
          type="number"
          placeholder="15"
          value={beam.totalCuts}
          onChange={(e) => handleBeamChange(index, "totalCuts", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-3 py-2">
        <input
          type="text"
          placeholder="Remarks"
          value={beam.remarks}
          onChange={(e) => handleBeamChange(index, "remarks", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-3 py-2 text-center">
        <button
          disabled={disableDelete}
          onClick={() => removeBeam(index)}
          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
    
  );
}
export default BeamRow;