const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    originalUrl: { type: String, required: true },
    shortUrl: String,
    clicksCounter: {
      type: Number,
      required: true,
      default: 0,
    },
    clicks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Click' }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Url', urlSchema);
