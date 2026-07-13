const companyService = require("../services/company.service");

const createCompany = async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
};