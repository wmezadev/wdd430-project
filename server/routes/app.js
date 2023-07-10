const path = require('path');
const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

/* GET home page */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/app/index.html'));
});

/* GET redirects short url to original url */
router.get('/:id', async (req, res) => {
    try {
        const url = await Url.findOne({ id: req.params.id });
        if (url) {
            // Increments counter by one because URL was visited
            await Url.updateOne({ id: req.params.id }, { $inc: { clicks: 1 } });
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
