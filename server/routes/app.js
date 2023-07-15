const path = require('path');
const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const Click = require('../models/Click');

/* GET home page */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/app/index.html'));
});

/* GET redirects short url to original url */
router.get('/:id', async (req, res) => {
  try {
    let url = await Url.findOne({ id: req.params.id });
    if (url) {
      // Save Click user agent data
      const click = new Click({
        ...req.useragent,
        urlId: url._id,
      });
      await click.save();
      // Increments counter by one because URL was visited
      await Url.findByIdAndUpdate(url._id, { $inc: { clicksCounter: 1 }, $push: { clicks: click._id } }, { new: true });
      // Redirects to original URL
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ message: 'No URL Found', data: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error', data: null });
  }
});

module.exports = router;
