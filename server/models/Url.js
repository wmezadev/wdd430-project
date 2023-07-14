const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    originalUrl: { type: String, required: true },
    shortUrl: String,
    clicks: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
