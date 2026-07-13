import { Plus } from "lucide-react";
import BeamRow from "./BeamRow";

const BeamGrid = ({
  beams,
  addBeam,
  removeBeam,
  updateBeam,
}) => {
  return (
    <div className="mt-8">

      {/* Heading */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Beam Details
          </h2>

          <p className="text-sm text-slate-500">
            Add all beams received in this receipt.
          </p>
        </div>

        <button
          onClick={addBeam}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
        >
          <Plus size={18} />

          Add Beam
        </button>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto rounded-xl border">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">Sr.</th>

              <th className="px-4 py-3 text-left">
                Beam Number
              </th>

              <th className="px-4 py-3 text-left">
                Cuts
              </th>

              <th className="px-4 py-3 text-left">
                Ends
              </th>

              <th className="px-4 py-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {beams.map((beam, index) => (

              <BeamRow
                key={index}
                beam={beam}
                index={index}
                updateBeam={updateBeam}
                removeBeam={removeBeam}
                desktop={true}
              />

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile View */}

      <div className="lg:hidden space-y-4">

        {beams.map((beam, index) => (

          <BeamRow
            key={index}
            beam={beam}
            index={index}
            updateBeam={updateBeam}
            removeBeam={removeBeam}
            desktop={false}
          />

        ))}

      </div>

    </div>
  );
}

export default BeamGrid;