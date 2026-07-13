const loomService = require("../services/loom.service");

const createLoom = async (req, res) => {
  try {
    const loom = await loomService.createLoom(req.body);

    res.status(201).json({
      success: true,
      data: loom,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllLooms = async (req, res) => {
  try {
    const looms = await loomService.getAllLooms();

    res.json({
      success: true,
      data: looms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLoom,
  getAllLooms,
};