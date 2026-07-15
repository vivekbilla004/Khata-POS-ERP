import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus } from "lucide-react";

import api from "../../services/api";

import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import Pagination from "../../components/ui/Pagination";
import Select from "../../components/ui/Select";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";

export default function LoomMaster() {
  const [loomNumber, setLoomNumber] = useState("");
  const [looms, setLooms] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  const fetchLooms = async () => {
    try {
      const res = await api.get("/looms");

      setLooms(res.data.data);
    } catch {
      toast.error("Failed to load looms");
    }
  };

  useEffect(() => {
    fetchLooms();
  }, []);

  const addLoom = async () => {
    if (!loomNumber) return toast.error("Enter Loom Number");

    try {
      await api.post("/looms", {
        loomNumber,
      });

      toast.success("Loom Added");

      setLoomNumber("");

      fetchLooms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create Loom");
    }
  };

  const filtered = useMemo(() => {
    return looms.filter((loom) => {
      const matchesSearch = loom.loomNumber.toString().includes(search);

      const matchesStatus =
        statusFilter === "All" ? true : loom.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [looms, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const currentRows = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Loom Master" subtitle="Manage all production looms" />

      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="number"
              placeholder="Loom Number"
              value={loomNumber}
              onChange={(e) => setLoomNumber(e.target.value)}
              className="rounded-xl border px-4 py-3"
            />

            <button
              onClick={addLoom}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Loom
            </button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search Loom..."
            />

            <Select
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Status" },
                { value: "Idle", label: "Idle" },
                { value: "Running", label: "Running" },
                { value: "Maintenance", label: "Maintenance" },
              ]}
            />
          </div>
        </div>

        {currentRows.length === 0 ? (
          <EmptyState title="No Loom Found" subtitle="Try changing filters." />
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl border">
            <DataTable
              columns={["Loom", "Status", "Actions"]}
              data={currentRows}
              emptyTitle="No Loom Found"
              renderRow={(loom) => (
                <tr key={loom._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">Loom {loom.loomNumber}</td>

                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={loom.status} />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <ActionButtons
                      onEdit={() => {
                        console.log("Edit", loom._id);
                      }}
                      onDelete={() => {
                        console.log("Delete", loom._id);
                      }}
                    />
                  </td>
                </tr>
              )}
            />
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </Card>
    </div>
  );
}
