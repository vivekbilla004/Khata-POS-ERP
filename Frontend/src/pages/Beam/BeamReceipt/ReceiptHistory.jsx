import { useEffect, useState } from "react";
import api from "../../../services/api";
import ReceiptHistoryCard from "./ReceiptHistoryCard";
import { toast } from "react-hot-toast";

export default function ReceiptHistory() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReceipts = async () => {
    try {
      const res = await api.get("/beam-receipts");

      setReceipts(res.data.data);
    } catch (err) {
      toast.error("Unable to load receipts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceipts();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        Loading Receipt History...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Receipt History
          </h2>

          <p className="text-slate-500">
            View previous beam receipts
          </p>

        </div>

      </div>

      {receipts.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No Receipts Found
        </div>
      ) : (
        <div className="space-y-4">

          {receipts.map((receipt) => (

            <ReceiptHistoryCard
              key={receipt._id}
              receipt={receipt}
            />

          ))}

        </div>
      )}
    </div>
  );
}