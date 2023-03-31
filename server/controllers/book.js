let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create a reference to the DB scheme which is the model
let Book = require('../models/books');
//  We want to display the book list
module.exports.displayBookList = (req, res, next) => {
    Book.find((err, BookList)=> {
        if (err) 
        {
            return console.error(err);
        } 
        else 
        {
            // console.log(BookList);
            res.render('../views/book/list', {title: "Book List", BookList: BookList, displayName: req.user?req.user.displayName:''});
        }
    });
}

module.exports.displayBookAddPage = (req, res, next) => {
    res.render('../views/book/add', {title: "add Book", displayName: req.user?req.user.displayName:''});
}

module.exports.processBookAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "Price": req.body.Price,
    });
    Book.create(newBook, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/books');
        }
    })
}

module.exports.displayBookEditPage = (req, res, next) => {
    let id = req.params.id;
    Book.findById({_id:id}, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('book/edit', {title: "Edit a book", book: bookToEdit, displayName: req.user?req.user.displayName:''});
        }
    })

}

module.exports.processBookEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "Price": req.body.Price,
    });
    Book.updateOne({_id:id}, updatedBook, (err)=>{
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/books');
        }
    });
}

module.exports.processBookDeletePage = (req, res, next) => {
    let id = req.params.id;
    Book.remove({_id:id}, (err)=> {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/books");
        }
    });
}