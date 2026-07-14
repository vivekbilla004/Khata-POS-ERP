const mongoose = require("mongoose");

const loomAllocationSchema = new mongoose.Schema(
  {
    loom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loom",
      required: true,
    },

    // Snapshot
    loomNumber: {
      type: Number,
      required: true,
    },

    beam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beam",
      required: true,
    },

    // Snapshot
    beamNumber: {
      type: String,
      required: true,
    },

    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: true,
    },

    // Snapshot
    partyName: {
      type: String,
      required: true,
    },

    // Snapshot
    designNo: {
      type: String,
      default: "",
    },

    allocationDate: {
      type: Date,
      default: Date.now,
    },

    totalCuts: {
      type: Number,
      required: true,
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
  },
);

loomAllocationSchema.index(
  { beam: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "Running",
    },
  },
);

loomAllocationSchema.index(
  { loom: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "Running",
    },
  },
);

module.exports = mongoose.model("LoomAllocation", loomAllocationSchema);
