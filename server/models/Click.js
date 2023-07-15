const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema(
  {
    browser: String,
    version: String,
    os: String,
    platform: String,
    url: { type: mongoose.Schema.Types.ObjectId, ref: 'Url' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Click', clickSchema);
