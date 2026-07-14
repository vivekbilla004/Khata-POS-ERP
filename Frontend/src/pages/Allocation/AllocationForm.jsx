export default function AllocationForm({
  beams,
  looms,
  form,
  handleChange,
  handleAllocate,
  loading,
}) {
  const selectedBeam = beams.find(
    (beam) => beam._id === form.beamId
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Beam */}

      <div>

        <label className="block mb-2 font-medium">
          Select Beam
        </label>

        <select
          name="beamId"
          value={form.beamId}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="">Select Beam</option>

          {beams.map((beam) => (
            <option key={beam._id} value={beam._id}>
              {beam.beamNumber} | {beam.party.partyName}
            </option>
          ))}
        </select>

      </div>

      {/* Loom */}

      <div>

        <label className="block mb-2 font-medium">
          Select Loom
        </label>

        <select
          name="loomId"
          value={form.loomId}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="">Select Loom</option>

          {looms.map((loom) => (
            <option key={loom._id} value={loom._id}>
              Loom {loom.loomNumber}
            </option>
          ))}
        </select>

      </div>

      {/* Beam Info */}

      {selectedBeam && (

        <div className="lg:col-span-2 rounded-xl bg-slate-50 border p-5">

          <h2 className="font-semibold mb-4">
            Beam Information
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div>
              <p className="text-sm text-slate-500">
                Beam No
              </p>

              <h3 className="font-semibold">
                {selectedBeam.beamNumber}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Party
              </p>

              <h3 className="font-semibold">
                {selectedBeam.party.partyName}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Cuts
              </p>

              <h3 className="font-semibold">
                {selectedBeam.totalCuts}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Ends
              </p>

              <h3 className="font-semibold">
                {selectedBeam.ends}
              </h3>
            </div>

          </div>

        </div>

      )}

      <div className="lg:col-span-2 flex justify-end">

        <button
          disabled={loading}
          onClick={handleAllocate}
          className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Allocating..." : "Allocate Beam"}
        </button>

      </div>

    </div>
  );
}