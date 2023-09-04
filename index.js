require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const router = require('./routes/routes');

//Mango connection
// mongoose.connect(process.env.DATABASE_URL);
// const database = mongoose.connection;

// database.on('error', (error) => {
//   console.log(error);
// });

// database.once('connected', () => {
//   console.log('Database Connected');
// });

// Basic Configuration
const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
