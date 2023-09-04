const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// Your first API endpoint
router.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

module.exports = router;
