const mongoose = require('mongoose');
const Click = require('./Click');

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

urlSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getQuery();
  const urlId = query._id;
  await Click.deleteMany({ url: urlId });
  next();
});

module.exports = mongoose.model('Url', urlSchema);
