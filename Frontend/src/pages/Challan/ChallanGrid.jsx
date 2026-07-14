import LoomCard from "./LoomCard";
import { Minus, Plus } from "lucide-react";

export default function ChallanGrid({
  allocations,
  updateTaka,
}) {
  return (
    <div className="mt-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-semibold">
            Running Looms
          </h2>

          <p className="text-sm text-slate-500">
            Enter today's production.
          </p>

        </div>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto rounded-xl border">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Loom
              </th>

              <th className="px-4 py-3 text-left">
                Beam
              </th>

              <th className="px-4 py-3 text-left">
                Design
              </th>

              <th className="px-4 py-3 text-left">
                Party
              </th>

              <th className="px-4 py-3 text-center">
                Remaining
              </th>

              <th className="px-4 py-3 text-center">
                Today's Taka
              </th>

            </tr>

          </thead>

          <tbody>

            {allocations.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="py-10 text-center text-slate-500"
                >
                  No Running Looms
                </td>

              </tr>

            ) : (

              allocations.map((item) => (

                <tr
                  key={item._id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-4 py-3 font-semibold">
                    Loom {item.loomNumber}
                  </td>

                  <td className="px-4 py-3">
                    {item.beamNumber}
                  </td>

                  <td className="px-4 py-3">
                    {item.designNo || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {item.partyName}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">

                      {item.remainingCuts}

                    </span>

                  </td>

                  <td className="px-4 py-3">

                    <div className="flex items-center justify-center gap-3">

                      <button
                        onClick={() =>
                          updateTaka(
                            item._id,
                            Math.max(
                              0,
                              item.takaToday - 1
                            )
                          )
                        }
                        className="rounded-lg bg-red-100 p-2 hover:bg-red-200"
                      >
                        <Minus size={18} />
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
                        className="w-20 rounded-lg border text-center py-2"
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
                        className="rounded-lg bg-green-100 p-2 hover:bg-green-200"
                      >
                        <Plus size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden space-y-4">

        {allocations.length === 0 ? (

          <div className="rounded-xl border bg-white p-6 text-center text-slate-500">

            No Running Looms

          </div>

        ) : (

          allocations.map((item) => (

            <LoomCard
              key={item._id}
              item={item}
              updateTaka={updateTaka}
            />

          ))

        )}

      </div>

    </div>
  );
}