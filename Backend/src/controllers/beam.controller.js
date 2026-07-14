const beamService = require("../services/beam.service");

const createBeam = async (req, res) => {
  try {
    const beam = await beamService.createBeam(req.body);

    res.status(201).json({
      success: true,
      data: beam,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBeams = async (req, res) => {
  try {
    const beams = await beamService.getWaitingBeams();

    res.json({
      success: true,
      data: beams,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAvailableBeams = async (req, res) => {
  try {
    const beams = await beamService.getAvailableBeams();

    res.json({
      success: true,
      data: beams,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createBeam,
  getAllBeams,
  getAvailableBeams,
};