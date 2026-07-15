import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus } from "lucide-react";

import api from "../../services/api";

import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import Pagination from "../../components/ui/Pagination";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";

export default function PartyMaster() {
  const [parties, setParties] = useState([]);

  const [form, setForm] = useState({
    partyName: "",
    gstNumber: "",
    phone: "",
    address: "",
  });

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  const fetchParties = async () => {
    try {
      const res = await api.get("/parties");

      setParties(res.data.data);
    } catch {
      toast.error("Failed to load parties");
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.partyName)
      return toast.error("Enter Party Name");

    try {
      await api.post("/parties", form);

      toast.success("Party Added");

      setForm({
        partyName: "",
        gstNumber: "",
        phone: "",
        address: "",
      });

      fetchParties();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create party"
      );
    }
  };

  const filtered = useMemo(() => {
    return parties.filter((party) =>
      party.partyName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [parties, search]);

  const totalPages = Math.ceil(
    filtered.length / rowsPerPage
  );

  const currentRows = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-6">

      <PageHeader
        title="Party Master"
        subtitle="Manage Textile Parties"
      />

      <Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

          <input
            name="partyName"
            placeholder="Party Name"
            value={form.partyName}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="gstNumber"
            placeholder="GST Number"
            value={form.gstNumber}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />

          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Party
          </button>

        </div>

      </Card>

      <Card>

        <div className="mb-5">

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search Party..."
          />

        </div>

        <DataTable
          columns={[
            "Party",
            "GST",
            "Phone",
            "Address",
            "Actions",
          ]}
          data={currentRows}
          emptyTitle="No Party Found"
          renderRow={(party) => (
            <tr
              key={party._id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-4 py-3 font-medium">
                {party.partyName}
              </td>

              <td className="px-4 py-3">
                {party.gstNumber || "-"}
              </td>

              <td className="px-4 py-3">
                {party.phone || "-"}
              </td>

              <td className="px-4 py-3">
                {party.address || "-"}
              </td>

              <td className="px-4 py-3 text-center">
                <ActionButtons
                  onEdit={() =>
                    console.log("Edit", party._id)
                  }
                  onDelete={() =>
                    console.log("Delete", party._id)
                  }
                />
              </td>
            </tr>
          )}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

      </Card>

    </div>
  );
}