import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function ReceiptHistoryCard({ receipt }) {
  const [open, setOpen] = useState(false);

  const [details, setDetails] = useState(null);

  const loadDetails = async () => {
    if (details) return;

    const res = await api.get(`/beam-receipts/${receipt._id}`);

    setDetails(res.data.data);
  };

  useEffect(() => {
    if (open) {
      loadDetails();
    }
  }, [open]);

  return (
    <div className="rounded-xl border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-slate-50 hover:bg-slate-100 px-5 py-4 flex justify-between items-center"
      >
        <div className="text-left">
          <h3 className="font-semibold text-lg">{receipt.receiptNumber}</h3>

          <p className="text-sm text-slate-500">{receipt.party?.partyName}</p>

          <p className="text-sm text-slate-400">
            {new Date(receipt.receivedDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <h4 className="font-semibold">{receipt.totalBeams}</h4>

            <p className="text-xs text-slate-500">Beams</p>
          </div>

          <div className="text-center">
            <h4 className="font-semibold">{receipt.totalCuts}</h4>

            <p className="text-xs text-slate-500">Cuts</p>
          </div>

          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      {open && details && (
        <div className="p-5 border-t bg-white">
          {/* Remarks */}

          <div className="mb-5">
            <h4 className="font-semibold mb-1">Remarks</h4>

            <p>{receipt.remarks || "-"}</p>
          </div>

          {/* Images */}

          {receipt.images?.length > 0 && (
            <div className="mb-5">
              <h4 className="font-semibold mb-3">Receipt Images</h4>

              <div className="flex gap-4 flex-wrap">
                {receipt.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt=""
                    className="h-28 w-28 rounded-lg object-cover border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Beam Table */}

          <div className="overflow-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left">Beam No</th>

                  <th className="p-3 text-left">Design</th>

                  <th className="p-3">Ends</th>

                  <th className="p-3">Cuts</th>

                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {details.beams.map((beam) => (
                  <tr key={beam._id} className="border-t">
                    <td className="p-3">{beam.beamNumber}</td>

                    <td className="p-3">{beam.designNo}</td>

                    <td className="text-center">{beam.ends}</td>

                    <td className="text-center">{beam.totalCuts}</td>

                    <td className="text-center">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm">
                        {beam.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
