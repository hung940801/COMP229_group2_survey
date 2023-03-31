let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
// let Book = require('../models/books');
let bookController = require('../controllers/book');
// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// connect to our booksModel
let Book = require('../models/books');
// Get route for the book list page - read operation
// router.get('/', (req, res, next)=> {
//     Book.find((err, BookList)=> {
//         if (err) 
//         {
//             return console.error(err);
//         } 
//         else 
//         {
//             // console.log(BookList);
//             res.render('../views/book/list', {title: "Book List", BookList: BookList});
//             // return res;
//         }
//     });
// });
router.get('/', bookController.displayBookList);

// Get route for displaying the Add Page - CREATE operation
// router.get('/add', (req, res, next) => {
//     res.render('../views/book/add', {title: "add Book"});
// });
router.get('/add', requireAuth, bookController.displayBookAddPage);

// POST Route for processing the Add Page - CREATE Operation
// router.post('/add', (req, res, next) => {
//     let newBook = Book({
//         "name": req.body.name,
//         "author": req.body.author,
//         "published": req.body.published,
//         "Price": req.body.Price,
//     });
//     Book.create(newbook, (err, book) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         } else {
//             res.redirect('/books');
//         }
//     })
// });
router.post('/add', requireAuth, bookController.processBookAddPage);

// Get Route for displaying the Edit page - Update Operation
// router.get('/edit/:id', (req, res, next) => {
//     let id = req.params.id;
//     Book.findById(id, (err, bookToEdit) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         } else {
//             res.render('book/edit', {title: "Edit a book", book: bookToEdit});
//         }
//     })

// });
router.get('/edit/:id', requireAuth, bookController.displayBookEditPage);

// POST Route for processing the Edit page - UPDATE operation
router.post('/edit/:id', requireAuth, bookController.processBookEditPage);

// GET Route for perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, bookController.processBookDeletePage);

module.exports = router;