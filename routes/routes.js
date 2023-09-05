const express = require('express');
const router = express.Router();
const path = require('path');
const validUrl = require('valid-url');
const dns = require('dns');
const Model = require('../models/models');
const { uid } = require('uid');
const { error } = require('console');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/api/shorturl', async (req, res) => {
  const fullurl = req.body.url;

  if (!validUrl.isUri(fullurl)) {
    return res.json({ error: 'invalid url' });
  }

  const u = new URL(fullurl);
  dns.lookup(u.hostname, 4, async (error, address, family) => {
    if (error) {
      return res.json({ error: 'invalid url' });
    }

    const record = await Model.findOne({
      original_url: fullurl,
    });

    if (!record) {
      const shortUrl = uid(6);
      const newRecord = new Model({
        original_url: fullurl,
        short_url: shortUrl,
      });

      try {
        const recordToSave = await newRecord.save();
        return res.json({
          original_url: recordToSave.original_url,
          short_url: recordToSave.short_url,
        });
      } catch (error) {
        return res.json({ message: error.message });
      }
    }

    return res.json({
      original_url: fullurl,
      short_url: record.short_url,
    });
  });
});

router.get('/api/shorturl/:shorturl', async (req, res) => {
  const record = await Model.findOne({ short_url: req.params.shorturl });

  if (!record) {
    return res.json({ error: 'invalid url' });
  }

  res.redirect(record.original_url);
});

router.use((req, res) => {
  res.json({
    message: 'Not Found',
  });
});

module.exports = router;
