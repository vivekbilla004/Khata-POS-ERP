const BeamReceipt = require("../models/beamReceipt.model");
const beamService = require("./beam.service");
const generateReceiptNumber = require("../utils/generateReceiptNumber");

const createBeamReceipt = async (data, files = []) => {
  const receiptNumber = await generateReceiptNumber();

  // Parse beams if sent as JSON string (multipart/form-data)
  const beams =
    typeof data.beams === "string" ? JSON.parse(data.beams) : data.beams;

  // Cloudinary uploaded images
  const images = files.map((file) => ({
    url: file.path,
    publicId: file.filename,
  }));

  // Calculate totals
  const totalBeams = beams.length;

  const totalCuts = beams.reduce(
    (sum, beam) => sum + Number(beam.totalCuts),
    0,
  );

  const totalEnds = beams.reduce((sum, beam) => sum + Number(beam.ends), 0);

  // Create Receipt
  const receipt = await BeamReceipt.create({
    receiptNumber,

    party: data.party,

    receivedDate: data.receivedDate || new Date(),

    driverName: data.driverName || "",

    vehicleNumber: data.vehicleNumber || "",

    transportName: data.transportName || "",

    partyChallanNumber: data.partyChallanNumber || "",

    receivedBy: data.receivedBy || "",

    remarks: data.remarks || "",

    totalBeams,

    totalCuts,

    totalEnds,

    images,
  });

  // Create Beam Records
  const beamDocuments = beams.map((beam) => ({
    receipt: receipt._id,
    party: data.party,

    beamNumber: beam.beamNumber,

    designNo: beam.designNo,

    receivedDate: data.receivedDate || new Date(),

    totalCuts: beam.totalCuts,

    remainingCuts: beam.totalCuts,

    ends: beam.ends,

    remarks: beam.remarks || "",

    status: "Waiting",
  }));

  await beamService.createManyBeams(beamDocuments);

  return await BeamReceipt.findById(receipt._id).populate("party", "partyName");
};

const getAllReceipts = async () => {
  return BeamReceipt.find()
    .populate("party", "partyName")
    .sort({ createdAt: -1 });
};

const Beam = require("../models/beam.model");

const getReceiptById = async (id) => {
  const receipt = await BeamReceipt.findById(id).populate("party", "partyName");

  if (!receipt) {
    throw new Error("Receipt not found");
  }

  const beams = await Beam.find({
    receipt: receipt._id,
  }).sort({
    beamNumber: 1,
  });

  return {
    receipt,
    beams,
  };
};

module.exports = {
  createBeamReceipt,
  getAllReceipts,
  getReceiptById,
};
