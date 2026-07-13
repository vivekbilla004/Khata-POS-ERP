import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";

import BeamForm from "./BeamForm";
import BeamGrid from "./BeamGrid";

import {
  createBeamReceipt,
} from "../../../services/beamReceipt.service";

import api from "../../../services/api";

const BeamReceipt = () => {
  const [loading, setLoading] = useState(false);

  const [parties, setParties] = useState([]);

  const initialReceipt = {
    party: "",
    receivedDate: new Date().toISOString().split("T")[0],
    remarks: "",
  };

  const initialBeam = {
    beamNumber: "",
    totalCuts: "",
    ends: "",
  };

  const [receipt, setReceipt] = useState(initialReceipt);

  const [beams, setBeams] = useState([initialBeam]);

  // -----------------------------
  // Fetch Parties
  // -----------------------------

  const fetchParties = async () => {
    try {
      const res = await api.get("/parties");

      setParties(res.data.data);
    } catch (err) {
      toast.error("Failed to load parties");
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  // -----------------------------
  // Receipt Fields
  // -----------------------------

  const handleReceiptChange = (e) => {
    const { name, value } = e.target;

    setReceipt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Beam Grid
  // -----------------------------

  const addBeam = () => {
    setBeams((prev) => [
      ...prev,
      {
        beamNumber: "",
        totalCuts: "",
        ends: "",
      },
    ]);
  };

  const removeBeam = (index) => {
    if (beams.length === 1) return;

    setBeams((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBeam = (index, field, value) => {
    const updated = [...beams];

    updated[index][field] = value;

    setBeams(updated);
  };

  // -----------------------------
  // Validation
  // -----------------------------

  const validate = () => {
    if (!receipt.party) {
      toast.error("Select Party");
      return false;
    }

    if (!receipt.receivedDate) {
      toast.error("Select Received Date");
      return false;
    }

    for (let i = 0; i < beams.length; i++) {
      const beam = beams[i];

      if (!beam.beamNumber.trim()) {
        toast.error(`Beam No missing in Row ${i + 1}`);
        return false;
      }

      if (!beam.totalCuts || beam.totalCuts <= 0) {
        toast.error(`Cuts missing in Row ${i + 1}`);
        return false;
      }

      if (!beam.ends || beam.ends <= 0) {
        toast.error(`Ends missing in Row ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  // -----------------------------
  // Save
  // -----------------------------

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await createBeamReceipt({
        ...receipt,
        beams,
      });

      toast.success("Beam Receipt Saved");

      setReceipt(initialReceipt);

      setBeams([initialBeam]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to Save Receipt"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <PageHeader
        title="Beam Receipt"
        subtitle="Receive multiple beams from party"
      />

      <Card>

        <BeamForm
          receipt={receipt}
          parties={parties}
          handleReceiptChange={handleReceiptChange}
        />

        <BeamGrid
          beams={beams}
          addBeam={addBeam}
          removeBeam={removeBeam}
          updateBeam={updateBeam}
        />

        <div className="mt-8 flex flex-col gap-4 border-t pt-5 md:flex-row md:items-center md:justify-between">

          <h2 className="font-semibold text-lg">
            Total Beams : {beams.length}
          </h2>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Receipt"}
          </button>

        </div>

      </Card>

    </div>
  );
}

export default BeamReceipt;