'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

//bring in a schema to interact with model
const Book = require('./models/books.js');
const req = require('express/lib/request');

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

//Implement middleware - must have this to recieve data from another site
app.use(cors());

//Allows our data to recieve json data
app.use(express.json());

const PORT = process.env.PORT || 3002;


//Add route(s)
app.get('/', (request, response) => {
  response.send('Welcome!')
})

//Add book route(s)
app.post('/book', postBooks);
app.get('/book', getBooks);
app.delete('/book/:id', deleteBooks);
app.put('/book/:id', updateBooks);
//^Delete book by by it's id

//Send a response to the request

async function getBooks(request, response) {
  try {
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
  } catch (error) {
    console.log(error);
  }
}

async function postBooks(request, response) {
  console.log(request.body);
  try {
    let createdBook = await Book.create(request.body);
    //Test this with thunder client can 'GET' data from /books endpoint
    response.status(200).send(createdBook)
  } catch (error) {
    next(err); 
  }
}

//Function below deletes a book by ID (line 98)   
// To delete, send a HTTP delete request to http://localhost:3001/book/<id>
async function deleteBooks(request, response) {
  //Extract passed parameter from the client's request
  try {
    let id = request.params.id;
    console.log(id);
    
    //You can test this with thunder client to simulate a 'GET' request to retireve data from /books endpoint
    
    await Book.findByIdAndDelete(id);
    response.status(200).send(`Book ${id} was deleted`);
  } catch (error) {
    next(err); 
  }
}

//update/PUT function goes here (reference line 46)
async function updateBooks(request, response, next) {
  //Extract passed parameter from the client's request
  try {
    let id = request.params.id;
    console.log(id);
    
    //Find the book by id and overwrite the existing field
    let updatedBook = await Book.findByIdAndUpdate(id, request.body, {new: true, overwrite: true});

    response.status(200).send(updatedBook);
  } catch (error) {
    next(err); 
  }
}



app.listen(PORT, () => console.log(`listening on ${PORT}`));
