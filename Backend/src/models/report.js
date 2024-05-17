const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assets: {
    type: [String],
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // Referencia al modelo User
    required: false,
  },
  verifiedAt: {
    type: Date,
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

module.exports = mongoose.model("Report", reportSchema);
