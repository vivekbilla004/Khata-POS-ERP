import { Plus } from "lucide-react";
import BeamRow from "./BeamRow";

const BeamGrid = ({ beams, setBeams }) => {
  const addBeam = () => {
    setBeams((prev) => [
      ...prev,
      {
        beamNumber: "",
        designNo: "",
        ends: "",
        totalCuts: "",
        remarks: "",
      },
    ]);
  };

  const removeBeam = (index) => {
    if (beams.length === 1) return;

    setBeams((prev) => prev.filter((_, i) => i !== index));
  };
  const handleBeamChange = (index, field, value) => {
    const updated = [...beams];

    updated[index][field] = value;

    // Check if current row is complete
    const row = updated[index];

    const rowCompleted =
      row.beamNumber.trim() !== "" &&
      row.designNo.trim() !== "" &&
      row.ends !== "" &&
      row.totalCuts !== "";

    const isLastRow = index === updated.length - 1;

    if (isLastRow && rowCompleted) {
      updated.push({
        beamNumber: "",
        designNo: "",
        ends: "",
        totalCuts: "",
        remarks: "",
      });
    }

    setBeams(updated);
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Beam Entry</h2>

          <p className="text-sm text-slate-500">
            Enter all beams received today.
          </p>
        </div>

        <button
          onClick={addBeam}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Beam
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-3 py-3">#</th>

              <th className="px-3 py-3">Beam No</th>

              <th className="px-3 py-3">Design</th>

              <th className="px-3 py-3">Ends</th>

              <th className="px-3 py-3">Cuts</th>

              <th className="px-3 py-3">Remarks</th>

              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {beams.map((beam, index) => (
              <BeamRow
                key={index}
                beam={beam}
                index={index}
                removeBeam={removeBeam}
                handleBeamChange={handleBeamChange}
                disableDelete={beams.length === 1}
              />
            ))}
          </tbody>
        </table>
        <button
          onClick={addBeam}
          className="flex items-center gap-2 rounded-xl border border-dashed border-blue-500 px-5 py-3 text-blue-600 hover:bg-blue-50"
        >
          <Plus size={18} />
          Add Another Beam
        </button>
      </div>
    </div>
  );
}
export default BeamGrid;