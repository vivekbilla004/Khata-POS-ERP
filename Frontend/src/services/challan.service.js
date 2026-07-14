import api from "./api";

export const getRunningAllocations = async () => {
  const res = await api.get("/allocations");
  return res.data.data;
};

export const createChallan = async (data) => {
  const res = await api.post("/challans", data);
  return res.data;
};

export const getChallans = async () => {
  const res = await api.get("/challans");
  return res.data.data;
};

export default {
  getRunningAllocations,
  createChallan,
  getChallans,
};
