const Beam = require("../models/beam.model");

const createBeam = async (beamData) => {
  return await Beam.create(beamData);
};

const getBeamByNumber = async (beamNumber) => {
  return Beam.findOne({ beamNumber });
};

const getWaitingBeams = async () => {
  return Beam.find({ status: "Waiting" })
    .populate("party", "partyName")
    .sort({ receivedDate: 1 });
};

module.exports = {
  createBeam,
  getBeamByNumber,
  getWaitingBeams,
};