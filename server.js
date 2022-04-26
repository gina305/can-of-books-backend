'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
//bring in a schema to interact with model
const Book = require('./models/books.js')
//bring in mongoose
const mongoose = require('mongoose');
const { nextTick } = require('process');
const { findByIdAndDelete } = require('./models/books.js');
mongoose.connect(process.env.DB_URL);


// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

//Implement express
const app = express();

//Implement middleware - must have this to recieve data from another site
app.use(cors());

//Allows our data to recieve json data
app.use(express.json());

const PORT = process.env.PORT || 3002;


//Add route(s)
app.get('/test', (request, response) => {

  response.send('test request received')

})


//Add book route(s)
app.get('/book', async (request, response) => {
app.post('/book', postBooks);

//Delete book by by it's id
app.delete('/book/:id', deleteBooks);
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


async function postBooks(request, response){
  try {
    console.log(request.body);
    let createdBook = await Book.create(request.body)

    //Test this with thunder client can 'GET' data from /books endpoint
    response.status(200).send('We have data')
    
  } catch (error) {
    next(err);
    
  }

}

async function deleteBooks(request, response){


    //Extract passed parameter *
    let id = request.params.id;

    console.log(id);
  try {
    //Test this with thunder client can 'GET' data from /books endpoint

    //Delete the book by id
    await Book.findByIdAndDelete(id);
    response.status(200).send(`Book ${id} was found`);
  } catch (error) {
    nextTick(err);
    
  }

}