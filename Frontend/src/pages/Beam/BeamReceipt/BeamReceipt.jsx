import { useEffect, useState } from "react";

import PageHeader from "../../../components/ui/PageHeader";

import ReceiptHeader from "./ReceiptHeader";
import ReceiptImageUpload from "./ReceiptImageUpload";
import BeamGrid from "./BeamGrid";
import ReceiptSummary from "./ReceiptSummary";
import toast from "react-hot-toast";
import ReceiptHistory from "./ReceiptHistory";

import api from "../../../services/api";

const BeamReceipt = () => {
  const [parties, setParties] = useState([]);

  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    party: "",
    receivedDate: new Date().toISOString().split("T")[0],
    driverName: "",
    vehicleNumber: "",
    transportName: "",
    partyChallanNumber: "",
    receivedBy: "",
    remarks: "",
  });

  const [beams, setBeams] = useState([
    {
      beamNumber: "",
      designNo: "",
      ends: "",
      totalCuts: "",
      remarks: "",
    },
  ]);

  useEffect(() => {
    loadParties();
  }, []);

  const loadParties = async () => {
    try {
      const res = await api.get("/parties");
      setParties(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveReceipt = async () => {
    try {
      const formData = new FormData();

      formData.append("party", form.party);
      formData.append("receivedDate", form.receivedDate);
      formData.append("driverName", form.driverName);
      formData.append("vehicleNumber", form.vehicleNumber);
      formData.append("transportName", form.transportName);
      formData.append("partyChallanNumber", form.partyChallanNumber);
      formData.append("receivedBy", form.receivedBy);
      formData.append("remarks", form.remarks);

      formData.append("beams", JSON.stringify(beams));

      images.forEach((image) => {
        formData.append("images", image);
      });

      await api.post("/beam-receipts", formData);

      toast.success("Receipt Saved");

      loadReceipts();
    } catch (err) {
      console.log(err);

      console.log(err.response);

      console.log(err.response?.data);

      toast.error(err.response?.data?.message || "Unable to Save Receipt");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Beam Receipt" subtitle="Receive Beam from Party" />

      <ReceiptHeader
        parties={parties}
        form={form}
        handleChange={handleChange}
      />

      <ReceiptImageUpload images={images} setImages={setImages} />

      <BeamGrid beams={beams} setBeams={setBeams} />

      <ReceiptSummary beams={beams} />
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveReceipt}
          className="rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700"
        >
          Save Receipt
        </button>
      </div>
      <ReceiptHistory />
    </div>
  );
};
export default BeamReceipt;
