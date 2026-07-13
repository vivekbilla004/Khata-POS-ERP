const mongoose = require("mongoose");

const partySchema = new mongoose.Schema(
  {
    partyName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    mobile: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
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

module.exports = mongoose.model("Party", partySchema);