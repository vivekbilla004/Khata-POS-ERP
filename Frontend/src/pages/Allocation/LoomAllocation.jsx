import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

import AllocationForm from "./AllocationForm";

import {
  getAvailableBeams,
  getIdleLooms,
  allocateBeam,
  getRunningAllocations,
} from "../../services/allocation.service";

export default function LoomAllocation() {
  const [beams, setBeams] = useState([]);
  const [looms, setLooms] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    beamId: "",
    loomId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [beamData, loomData, allocationData] = await Promise.all([
        getAvailableBeams(),
        getIdleLooms(),
        getRunningAllocations(),
      ]);

      setBeams(beamData);
      setLooms(loomData);
      setAllocations(allocationData);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAllocate = async () => {
    if (!form.beamId) return toast.error("Select Beam");

    if (!form.loomId) return toast.error("Select Loom");

    try {
      setLoading(true);

      await allocateBeam(form);

      setForm({
        beamId: "",
        loomId: "",
      });

      toast.success("Beam Allocated Successfully");

      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Allocation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Loom Allocation"
        subtitle="Allocate Beam to Idle Loom"
      />

      <Card>
        <AllocationForm
          beams={beams}
          looms={looms}
          form={form}
          handleChange={handleChange}
          handleAllocate={handleAllocate}
          loading={loading}
        />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Running Looms</h2>

          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left">Loom</th>

                  <th className="px-4 py-3 text-left">Beam</th>

                  <th className="px-4 py-3 text-left">Party</th>

                  <th className="px-4 py-3 text-center">Total</th>

                  <th className="px-4 py-3 text-center">Remaining</th>

                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {allocations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-slate-500">
                      No Running Looms
                    </td>
                  </tr>
                ) : (
                  allocations.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-slate-50">
                      <td className="px-4 py-3">Loom {item.loom.loomNumber}</td>

                      <td className="px-4 py-3">{item.beam.beamNumber}</td>

                      <td className="px-4 py-3">{item.party.partyName}</td>

                      <td className="px-4 py-3 text-center">
                        {item.totalCuts}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {item.remainingCuts}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
