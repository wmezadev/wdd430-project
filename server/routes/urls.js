const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');
const { BASE_URL } = require('../../config/index.js');

/* GET a shortened URL by id */
router.get('/:id', async (req, res) => {
  try {
    const url = await Url.findOne({ id: req.params.id });
    if (url) {
      return res.status(200).json({ message: 'URL fetched successfully', data: url });
    } else {
      return res.status(404).json({ message: 'No URL Found', data: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error', data: null });
  }
});

/* GET List all stored shortened URLs */
router.get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    return res.status(200).json({ message: 'URLs List fetched successfully', data: urls });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error', data: null });
  }
});

/* POST Generate a short URL and save into the database */
router.post('/', async (req, res) => {
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
        date: new Date(),
      });
      await url.save();
      return res.json({ message: 'URL shortened successfully', data: url });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error', data: originalUrl });
  }
});

/* PUT updates a URL data (only originalUrl and clicks) */
router.put('/:id', async (req, res) => {
  try {
    const url = await Url.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          originalUrl: req.body.originalUrl,
          clicks: req.body.clicks,
        },
      },
    );
    if (url) {
      return res.status(201).json({ message: 'URL updated successfully', data: url });
    } else {
      return res.status(404).json({ message: 'No URL Found', data: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error', data: null });
  }
});

/* DELETE remove a URL from the database */
router.delete('/:id', async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ id: req.params.id });
    if (url) {
      return res.status(204).json({ message: 'URL deleted successfully' });
    } else {
      return res.status(404).json({ message: 'No URL Found', data: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error', data: null });
  }
});

module.exports = router;
