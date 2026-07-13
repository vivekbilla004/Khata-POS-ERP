import api from "./api";

export const getAllBeamReceipts = async () => {
  const res = await api.get("/beam-receipts");
  return res.data.data;
};

export const createBeamReceipt = async (data) => {
  const res = await api.post("/beam-receipts", data);
  return res.data;
};