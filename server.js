'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
//bring in a schema to interact with model
const Book = require('./models/books.js')
//bring in mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);


// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

//Implement express
const app = express();

//Implement middleware
app.use(cors());

const PORT = process.env.PORT || 3002;


//Add route(s)
app.get('/test', (request, response) => {

  response.send('test request received')

})


//Add book route(s)
app.get('/book', async (request, response) => {

  //Send a response to the request
  // response.send('book route is working');

  //try {
    const queryObj = {};

    //Find the title using the user's request
    if (request.query.title) {
      queryObj.title = request.query.title;
    }
    console.log(queryObj);

    //Find the books using the defined schema
    const books = await Book.find(queryObj);
    console.log(books);

    //Send a response to the user request
    response.send(books);




 // } catch (error) {
 //   console.log(error);
  //}

})


app.listen(PORT, () => console.log(`listening on ${PORT}`));
