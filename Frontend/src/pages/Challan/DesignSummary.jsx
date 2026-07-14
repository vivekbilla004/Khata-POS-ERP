import { Palette } from "lucide-react";

export default function DesignSummary({
  designSummary,
  totalTaka,
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 mb-5">

        <div className="rounded-xl bg-indigo-100 p-3">

          <Palette
            size={22}
            className="text-indigo-700"
          />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            Design Summary
          </h2>

          <p className="text-sm text-slate-500">
            Today's production by design
          </p>

        </div>

      </div>

      {/* Empty */}

      {designSummary.length === 0 ? (

        <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">

          No Production Entered

        </div>

      ) : (

        <>

          <div className="space-y-3">

            {designSummary.map((item) => (

              <div
                key={item.designNo}
                className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3"
              >

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Design {item.designNo}
                  </h3>

                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                  {item.total} Taka

                </span>

              </div>

            ))}

          </div>

          {/* Footer */}

          <div className="mt-6 border-t pt-4">

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-bold">
                Total Production
              </h3>

              <span className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white">

                {totalTaka} Taka

              </span>

            </div>

          </div>

        </>

      )}

    </div>
  );
}