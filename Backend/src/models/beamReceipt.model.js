const mongoose = require("mongoose");

const beamReceiptSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },

    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: true,
    },

    receivedDate: {
      type: Date,
      required: true,
    },

    totalBeams: {
      type: Number,
      default: 0,
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BeamReceipt", beamReceiptSchema);
