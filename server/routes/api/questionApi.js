let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let questionController = require('../../controllers/question');
// helper function for guard purposes
// function requireAuth(req, res, next) {
//     // check if the user is logged in
//     if (!req.isAuthenticated()) {
//         return res.redirect('/login');
//     }
//     next();
// }

// // Get route for the book list page - read operation
// router.get('/', questionController.displayQuestionList);
router.get('/', questionController.apiGetQuestionList);

// // Get route for displaying the Add Page - CREATE operation
// router.get('/add', requireAuth, questionController.displayQuestionAddPage);
router.post('/add', questionController.apiAddQuestion);

// // POST Route for processing the Add Page - CREATE Operation
// router.post('/add', requireAuth, questionController.processQuestionAddPage);

// // Get Route for displaying the Edit page - Update Operation
// router.get('/edit/:id', requireAuth, questionController.displayQuestionEditPage);
router.get('/get/:id', questionController.apiGetQuestionByID);

// // POST Route for processing the Edit page - UPDATE operation
// router.post('/edit/:id', requireAuth, questionController.processQuestionEditPage);
router.post('/edit', questionController.apiEditQuestion);

// // GET Route for perform Deletion - DELETE Operation
// router.get('/delete/:id', requireAuth, questionController.processQuestionDeletePage);
router.delete('/delete/:id', questionController.apiDeleteQuestion);

module.exports = router;