'use strict';

const mongoose = require('mongoose');

//extract Scehme from mongoose
const {Schema} = mongoose;

//create book schema - how books are structured
const bookSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},

})

//Define model for schema to sape data <string> <schema>
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;