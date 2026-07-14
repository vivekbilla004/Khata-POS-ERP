import api from "./api";

export const getAvailableBeams = async () => {
  const res = await api.get("/beams/available");
  return res.data.data;
};

export const getIdleLooms = async () => {
  const res = await api.get("/looms/idle");
  return res.data.data;
};

export const allocateBeam = async (data) => {
  const res = await api.post("/allocations", data);
  return res.data;
  Console.log("Allocation response:", res.data);
};

export const getRunningAllocations = async () => {
  const res = await api.get("/allocations");
  return res.data.data;
};

export default {
  getAvailableBeams,
  getIdleLooms,
  allocateBeam,
  getRunningAllocations,
};
