const BeamReceipt = require("../models/beamReceipt.model");

const generateReceiptNumber = async () => {

    const count = await BeamReceipt.countDocuments();

    return `BR-${String(count + 1).padStart(5,"0")}`;

};

module.exports = generateReceiptNumber;