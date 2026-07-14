const mongoose = require("mongoose");

const challanEntrySchema = new mongoose.Schema(
  {
    allocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoomAllocation",
      required: true,
    },

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

    designNo: {
      type: String,
      required: true,
    },

    takaProduced: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const dailyChallanSchema = new mongoose.Schema(
  {
    challanDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    entries: [challanEntrySchema],

    totalTaka: {
      type: Number,
      default: 0,
    },

    designSummary: [
      {
        designNo: String,
        totalTaka: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DailyChallan", dailyChallanSchema);