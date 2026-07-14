const challanService = require("../services/dailyChallan.service");

const createDailyChallan = async (req, res) => {
  try {
    const challan = await challanService.createDailyChallan(req.body);

    res.status(201).json({
      success: true,
      data: challan,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllChallans = async (req, res) => {
  try {
    const challans = await challanService.getAllChallans();

    res.json({
      success: true,
      data: challans,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getChallanById = async (req, res) => {
  try {
    const challan = await challanService.getChallanById(req.params.id);

    res.json({
      success: true,
      data: challan,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createDailyChallan,
  getAllChallans,
  getChallanById,
};

