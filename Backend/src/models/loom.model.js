const mongoose = require("mongoose");

const loomSchema = new mongoose.Schema(
  {
    loomNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["Idle", "Running", "Maintenance"],
      default: "Idle",
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loom", loomSchema);