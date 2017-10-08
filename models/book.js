var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = {
    image: [Buffer],
    page: Number
}

var bookSchema = new Schema({
  cover: [Buffer],
  name: String,
  isbn: String,
  authors: [String],
  cost: Double,
  pages: [pageSchema]
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
