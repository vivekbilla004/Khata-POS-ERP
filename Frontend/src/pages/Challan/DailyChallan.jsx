import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

import ChallanGrid from "./ChallanGrid";
import ProductionSummary from "./ProductionSummary";
import DesignSummary from "./DesignSummary";
import DailyChallanHistory from "./DailyChallanHistory";

import {
  getRunningAllocations,
  createChallan,
} from "../../services/challan.service";

export default function DailyChallan() {
  const [loading, setLoading] = useState(false);

  const [allocations, setAllocations] = useState([]);

  const [challanDate, setChallanDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const loadRunningLooms = async () => {
    try {
      const data = await getRunningAllocations();

      const formatted = data.map((item) => ({
        ...item,
        takaToday: 0,
      }));

      setAllocations(formatted);
    } catch (err) {
      toast.error("Failed to load running looms");
    }
  };

  useEffect(() => {
    loadRunningLooms();
  }, []);

  // ----------------------------
  // Update Today's Production
  // ----------------------------

  const updateTaka = (id, value) => {
    setAllocations((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              takaToday: Number(value),
            }
          : item,
      ),
    );
  };

  // ----------------------------
  // Total Production
  // ----------------------------

  const totalTaka = useMemo(() => {
    return allocations.reduce(
      (sum, item) => sum + Number(item.takaToday || 0),
      0,
    );
  }, [allocations]);

  // ----------------------------
  // Design Summary
  // ----------------------------

  const designSummary = useMemo(() => {
    const map = {};

    allocations.forEach((item) => {
      if (item.takaToday > 0) {
        if (!map[item.designNo]) {
          map[item.designNo] = 0;
        }

        map[item.designNo] += Number(item.takaToday);
      }
    });

    return Object.entries(map).map(([designNo, total]) => ({
      designNo,
      total,
    }));
  }, [allocations]);

  // ----------------------------
  // Save Challan
  // ----------------------------

  const handleSave = async () => {
    const entries = allocations
      .filter((item) => item.takaToday > 0)
      .map((item) => ({
        allocation: item._id,
        takaProduced: item.takaToday,
      }));

    if (entries.length === 0) {
      return toast.error("Enter production first");
    }

    try {
      setLoading(true);

      await createChallan({
        challanDate,
        entries,
      });

      toast.success("Daily Challan Saved");

      loadRunningLooms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save challan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Daily Challan" subtitle="Daily Production Entry" />

      <Card>
        {/* Date */}

        <div className="mb-6">
          <label className="block mb-2 font-medium">Challan Date</label>

          <input
            type="date"
            value={challanDate}
            onChange={(e) => setChallanDate(e.target.value)}
            className="rounded-lg border px-4 py-3"
          />
        </div>

        {/* Grid */}

        <ChallanGrid allocations={allocations} updateTaka={updateTaka} />

        {/* Summary */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <ProductionSummary totalTaka={totalTaka} allocations={allocations} />

          <DesignSummary designSummary={designSummary} totalTaka={totalTaka} />
        </div>

        {/* Save */}

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Daily Challan"}
          </button>
        </div>
      <DailyChallanHistory />
      </Card>
    </div>
  );
}
