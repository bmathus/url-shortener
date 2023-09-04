const express = require('express');
const router = express.Router();
const path = require('path');
const validUrl = require('valid-url');
const Model = require('../models/models');
const { uid } = require('uid');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/api/shorturl', async (req, res) => {
  const url = req.body.url;

  if (!validUrl.isUri(url)) {
    return res.json({ error: 'invalid url' });
  }

  const record = await Model.findOne({
    original_url: url,
  });

  if (!record) {
    const shortUrl = uid(6);

    const newRecord = new Model({
      original_url: url,
      short_url: shortUrl,
    });

    try {
      const recordToSave = await newRecord.save();
      return res.status(200).json({
        original_url: recordToSave.original_url,
        short_url: recordToSave.short_url,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.json({
    original_url: url,
    short_url: record.short_url,
  });
});

router.get('/api/shorturl/:shorturl', async (req, res) => {
  const record = await Model.findOne({ short_url: req.params.shorturl });

  if (!record) {
    return res.json({
      message: 'No short URL found for the given input',
    });
  }

  res.redirect(record.original_url);
});

router.use((req, res) => {
  res.json({
    message: 'Not Found',
  });
});

module.exports = router;
