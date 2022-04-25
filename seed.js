'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Book = require('./model/books.js')

async function seed() {

  await Book.create({
    title: "Aries Book",
    description: "Book about aries",
    status: "read",

  });
  console.log('Aries was added');
  await Book.create({
    title: "Jennas Book",
    description: "Book about Jenna",
    status: "read",
  });
  console.log('Aries was added');

  //Disconnect from database
  mongoose.disconnect(process.env.DB_URL);

}
seed();
