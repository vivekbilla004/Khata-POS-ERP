// const mongoose = require("mongoose");

// const beamReceiptSchema = new mongoose.Schema(
//   {
//     receiptNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     party: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Party",
//       required: true,
//     },

//     receivedDate: {
//       type: Date,
//       required: true,
//     },

//     totalBeams: {
//       type: Number,
//       default: 0,
//     },
//     remarks: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// module.exports = mongoose.model("BeamReceipt", beamReceiptSchema);

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
  },
  {
    _id: false,
  },
);

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
      default: Date.now,
    },

    driverName: {
      type: String,
      trim: true,
      default: "",
    },

    vehicleNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    transportName: {
      type: String,
      trim: true,
      default: "",
    },

    partyChallanNumber: {
      type: String,
      trim: true,
      default: "",
    },

    receivedBy: {
      type: String,
      trim: true,
      default: "",
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    totalBeams: {
      type: Number,
      default: 0,
    },

    totalCuts: {
      type: Number,
      default: 0,
    },

    totalEnds: {
      type: Number,
      default: 0,
    },

    locked: {
      type: Boolean,
      default: false,
    },

    images: [imageSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BeamReceipt", beamReceiptSchema);
