const beamReceiptService = require("../services/beamReceipt.service");

const createBeamReceipt = async (req, res) => {
  try {
    const receipt = await beamReceiptService.createBeamReceipt(
      req.body,
      req.files || [],
    );

    res.status(201).json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllReceipts = async (req, res) => {
  try {
    const receipts = await beamReceiptService.getAllReceipts();

    res.json({
      success: true,
      data: receipts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReceiptById = async (req, res) => {
  try {
    const data = await beamReceiptService.getReceiptById(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBeamReceipt,
  getAllReceipts,
  getReceiptById,
};
