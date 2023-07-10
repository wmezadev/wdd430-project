const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');
const { BASE_URL } = require('../../config/index.js');

/* POST Generate short URL and save into a collection */
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    if (!validUrl.isUri(originalUrl)) {
        return res.status(401).json('Invalid originalUrl');
    }

    const id = shortid.generate();

    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            return res.json(url);
        } else {
            const shortUrl = `${BASE_URL}/${id}`;
            url = new Url({
                originalUrl,
                shortUrl,
                id,
                date: new Date()
            });
            await url.save();
            return res.json(url);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server Error');
    }
});

module.exports = router;
