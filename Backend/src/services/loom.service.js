const Loom = require("../models/loom.model");

const createLoom = async (data) => {
  return await Loom.create(data);
};

const getAllLooms = async () => {
  return await Loom.find({ isActive: true }).sort({ loomNumber: 1 });
};

module.exports = {
  createLoom,
  getAllLooms,
};