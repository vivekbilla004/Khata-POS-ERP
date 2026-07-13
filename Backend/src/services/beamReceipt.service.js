// const mongoose = require("mongoose");

// const BeamReceipt = require("../models/beamReceipt.model");
// const beamService = require("./beam.service");

// // Generate Receipt Number
// const generateReceiptNumber = async () => {
//   const count = await BeamReceipt.countDocuments();

//   return `BR-${String(count + 1).padStart(5, "0")}`;
// };

// const createBeamReceipt = async (data) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const receiptNumber = await generateReceiptNumber();

//     // Create Receipt
//     const receipt = await BeamReceipt.create(
//       [
//         {
//           receiptNumber,
//           party: data.party,
//           receivedDate: data.receivedDate,
//           totalBeams: data.beams.length,
//           remarks: data.remarks || "",
//         },
//       ],
//       { session }
//     );

//     // Create Beam Records
//     for (const beam of data.beams) {
//       await beamService.createBeam(
//         {
//           receipt: receipt[0]._id,
//           party: data.party,
//           beamNumber: beam.beamNumber,
//           receivedDate: data.receivedDate,
//           totalCuts: beam.totalCuts,
//           remainingCuts: beam.totalCuts,
//           ends: beam.ends,
//           status: "Waiting",
//         },
//         session
//       );
//     }

//     await session.commitTransaction();

//     return receipt[0];
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }
// };

// const getAllReceipts = async () => {
//   return await BeamReceipt.find()
//     .populate("party", "partyName")
//     .sort({ receivedDate: -1 });
// };

// module.exports = {
//   createBeamReceipt,
//   getAllReceipts,
// };

const BeamReceipt = require("../models/beamReceipt.model");
const beamService = require("./beam.service");

// Generate Receipt Number
const generateReceiptNumber = async () => {
  const count = await BeamReceipt.countDocuments();
  return `BR-${String(count + 1).padStart(5, "0")}`;
};

const createBeamReceipt = async (data) => {
  // Generate Receipt Number
  const receiptNumber = await generateReceiptNumber();

  // Create Receipt
  const receipt = await BeamReceipt.create({
    receiptNumber,
    party: data.party,
    receivedDate: data.receivedDate,
    totalBeams: data.beams.length,
    remarks: data.remarks || "",
  });

  // Create All Beam Records
  for (const beam of data.beams) {
    await beamService.createBeam({
      receipt: receipt._id,
      party: data.party,
      beamNumber: beam.beamNumber,
      receivedDate: data.receivedDate,
      totalCuts: beam.totalCuts,
      remainingCuts: beam.totalCuts,
      ends: beam.ends,
      status: "Waiting",
    });
  }

  return receipt;
};

const getAllReceipts = async () => {
  return BeamReceipt.find()
    .populate("party", "partyName")
    .sort({ createdAt: -1 });
};

module.exports = {
  createBeamReceipt,
  getAllReceipts,
};