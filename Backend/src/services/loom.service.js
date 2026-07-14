const Loom = require("../models/loom.model");

const createLoom = async (data) => {
  return await Loom.create(data);
};

const getAllLooms = async () => {
  return await Loom.find({ isActive: true }).sort({ loomNumber: 1 });
};

const getIdleLooms = async () => {
  return Loom.find({
    status: "Idle",
    isActive: true,
  }).sort({ loomNumber: 1 });
};

module.exports = {
  createLoom,
  getAllLooms,
  getIdleLooms,
};