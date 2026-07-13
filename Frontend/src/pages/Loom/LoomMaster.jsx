import { useEffect, useState } from "react";
import api from "../../services/api";

const LoomMaster = () => {
  const [loomNumber, setLoomNumber] = useState("");
  const [looms, setLooms] = useState([]);

  const fetchLooms = async () => {
    const res = await api.get("/looms");
    setLooms(res.data.data);
  };

  const addLoom = async () => {
    if (!loomNumber) return;

    await api.post("/looms", {
      loomNumber,
    });

    setLoomNumber("");

    fetchLooms();
  };

  useEffect(() => {
    fetchLooms();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">

      <h1 className="text-2xl font-bold mb-5">
        Loom Master
      </h1>

      <div className="flex flex-col gap-3 md:flex-row">

        <input
          type="number"
          placeholder="Loom Number"
          value={loomNumber}
          onChange={(e) => setLoomNumber(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-60"
        />

        <button
          onClick={addLoom}
          className="bg-blue-600 text-white px-5 rounded w-full md:w-auto"
        >
          Add Loom
        </button>

      </div>

      <table className="min-w-full">

        <thead>

          <tr className="border-b">

            <th className="p-3">Loom</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {looms.map((loom) => (

            <tr key={loom._id} className="border-b">

              <td className="p-3">{loom.loomNumber}</td>

              <td>{loom.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LoomMaster;