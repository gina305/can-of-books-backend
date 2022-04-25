'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

//bring in mongoose
const mongoose = require('mongoose');
mongoose.connect(process)

//bring in a schema to interacts
const Book = require('./models./books.js')


// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
