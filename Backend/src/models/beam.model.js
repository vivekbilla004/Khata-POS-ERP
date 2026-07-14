const mongoose = require("mongoose");

const beamSchema = new mongoose.Schema(
  {
    receipt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BeamReceipt",
      required: true,
    },

    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: true,
    },

    beamNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    receivedDate: {
      type: Date,
      required: true,
    },

    totalCuts: {
      type: Number,
      required: true,
      min: 1,
    },

    remainingCuts: {
      type: Number,
      required: true,
    },

    ends: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["Waiting", "Ready", "Allocated", "Completed"],
      default: "Waiting",
    },

    loomAllocatedDate: {
      type: Date,
      default: null,
    },
    currentLoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loom",
      default: null,
    },

    allocationDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Beam", beamSchema);
