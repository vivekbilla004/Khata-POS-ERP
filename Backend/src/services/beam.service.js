const Beam = require("../models/beam.model");

// Create Single Beam
const createBeam = async (beamData) => {
  return Beam.create(beamData);
};

// Create Multiple Beams (Used in Beam Receipt)
const createManyBeams = async (beams) => {
  return Beam.insertMany(beams);
};

// Get Beam by Beam Number
const getBeamByNumber = async (beamNumber) => {
  return Beam.findOne({ beamNumber });
};

// Waiting Beams
const getWaitingBeams = async () => {
  return Beam.find({
    status: "Waiting",
  })
    .populate("party", "partyName")
    .sort({ receivedDate: 1 });
};

// Available Beams for Allocation
const getAvailableBeams = async () => {
  return Beam.find({
    status: "Waiting",
  })
    .populate("party", "partyName")
    .sort({ receivedDate: 1 });
};

// Receipt Details (Future History Module)
const getBeamsByReceipt = async (receiptId) => {
  return Beam.find({
    receipt: receiptId,
  }).sort({
    beamNumber: 1,
  });
};

module.exports = {
  createBeam,
  createManyBeams,
  getBeamByNumber,
  getWaitingBeams,
  getAvailableBeams,
  getBeamsByReceipt,
};