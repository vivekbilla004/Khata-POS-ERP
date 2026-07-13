const Party = require("../models/party.model");

const createParty = (data) => Party.create(data);

const getAllParties = () =>
  Party.find({ isActive: true }).sort({ partyName: 1 });

module.exports = {
  createParty,
  getAllParties,
};