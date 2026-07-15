const ReceiptSummary = ({ beams }) => {

  const totalBeams = beams.filter(
    (b) => b.beamNumber.trim() !== ""
  ).length;

  const totalCuts = beams.reduce(
    (sum, beam) => sum + Number(beam.totalCuts || 0),
    0
  );

  const totalEnds = beams.reduce(
    (sum, beam) => sum + Number(beam.ends || 0),
    0
  );

  return (
    <div className="rounded-2xl border bg-white p-6">

      <h2 className="mb-4 text-xl font-semibold">
        Receipt Summary
      </h2>

      <div className="grid grid-cols-3 gap-4">

        <div>
          <p className="text-slate-500">Beams</p>
          <h3 className="text-3xl font-bold">
            {totalBeams}
          </h3>
        </div>

        <div>
          <p className="text-slate-500">Cuts</p>
          <h3 className="text-3xl font-bold">
            {totalCuts}
          </h3>
        </div>

        <div>
          <p className="text-slate-500">Ends</p>
          <h3 className="text-3xl font-bold">
            {totalEnds}
          </h3>
        </div>

      </div>

    </div>
  );
}
export default ReceiptSummary;