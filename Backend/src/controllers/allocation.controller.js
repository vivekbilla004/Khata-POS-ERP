const allocationService = require("../services/allocation.service");

const allocateBeam = async (req, res) => {
  try {
    const allocation = await allocationService.allocateBeam(req.body);

    res.status(201).json({
      success: true,
      data: allocation,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getRunningAllocations = async (req, res) => {
  try {
    const data = await allocationService.getRunningAllocations();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  allocateBeam,
  getRunningAllocations,
};
