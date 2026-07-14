const mongoose = require("mongoose");

const loomAllocationSchema = new mongoose.Schema(
  {
    loom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loom",
      required: true,
    },

    beam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beam",
      required: true,
    },

    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: true,
    },

    allocationDate: {
      type: Date,
      default: Date.now,
    },

    remainingCuts: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Running", "Completed"],
      default: "Running",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LoomAllocation", loomAllocationSchema);