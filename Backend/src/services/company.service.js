const Company = require("../models/company.model");

const createCompany = async (data) => {
  return await Company.create(data);
};

module.exports = {
  createCompany,
};