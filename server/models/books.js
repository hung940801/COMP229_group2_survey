let mongoose = require('mongoose');
let booksModel = mongoose.Schema({
    name        : String,
    author      : String,
    published   : String,
    discription : String,
    Price       : Number,
},
{
    collection: "books"
});

module.exports = mongoose.model('books', booksModel);