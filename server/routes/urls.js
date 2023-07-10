const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');
const { BASE_URL } = require('../../config/index.js');

/* GET List all stored shortened URLs */
router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        return res.status(200).json({ message: 'URLs List fetched successfully', data: urls});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', data: null });
    }
});

/* POST Generate a short URL and save into the collection */
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    if (!validUrl.isUri(originalUrl)) {
        return res.status(401).json({ message: 'Invalid originalUrl', data: originalUrl });
    }

    const id = shortid.generate();

    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            return res.json({ message: 'URL is already shortened', data: url });
        } else {
            const shortUrl = `${BASE_URL}/${id}`;
            url = new Url({
                originalUrl,
                shortUrl,
                id,
                date: new Date()
            });
            await url.save();
            return res.json({ message: 'URL shortened successfully', data: url });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', data: originalUrl });
    }
});

module.exports = router;
