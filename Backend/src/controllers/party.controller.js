const partyService = require("../services/party.service");

const createParty = async (req, res) => {
  try {
    const party = await partyService.createParty(req.body);

    res.status(201).json({
      success: true,
      data: party,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllParties = async (req, res) => {
  const parties = await partyService.getAllParties();

  res.json({
    success: true,
    data: parties,
  });
};

module.exports = {
  createParty,
  getAllParties,
};