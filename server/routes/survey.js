let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let surveyController = require('../controllers/survey');
// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// Get route for the book list page - read operation
router.get('/', surveyController.displaySurveyList);

// Get route for displaying the Add Page - CREATE operation
router.get('/add', requireAuth, surveyController.displaySurveyAddPage);

// POST Route for processing the Add Page - CREATE Operation
router.post('/add', requireAuth, surveyController.processSurveyAddPage);

// Get Route for displaying the Edit page - Update Operation
router.get('/edit/:id', requireAuth, surveyController.displaySurveyEditPage);

// POST Route for processing the Edit page - UPDATE operation
router.post('/edit/:id', requireAuth, surveyController.processSurveyEditPage);

// GET Route for perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, surveyController.processSurveyDeletePage);

module.exports = router;