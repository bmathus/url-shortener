require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
