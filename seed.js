'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./model/books.js');
mongoose.connect(process.env.DB_URL);


async function seed() {
//Create a book based on schema
  await Book.create({
    title: "Aries Book",
    description: "Book about aries",
    status: "read",
  });
  console.log('Aries was added');

  //Create a book based on schema
  await Book.create({
    title: "Jennas Book",
    description: "Book about Jenna",
    status: "unread",
  });
  console.log('Aries was added');

  //Create a book based on schema
  await Book.create({
    title: "Chicken Book",
    description: "Book about chickens",
    status: "read",
  });
  console.log('Chicken book was added');

  //Disconnect from database
  mongoose.disconnect(process.env.DB_URL);

}
seed();
