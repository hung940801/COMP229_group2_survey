let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Home' });
// });
// router.get('/home', function(req, res, next) {
//   res.render('index', { title: 'Home' });
// });
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

// router.get('/about', function(req, res, next) {
//   res.render('index', { title: 'About' });
// });
// router.get('/about', indexController.displayAboutPage);

// router.get('/services', function(req, res, next) {
//   res.render('index', { title: 'Services' });
// });
// router.get('/services', indexController.displayServicesPage);
// router.get('/products', function(req, res, next) {
//   res.render('index', { title: 'Products' });
// });
// router.get('/products', indexController.displayProductsPage);
// router.get('/contact', function(req, res, next) {
//   res.render('index', { title: 'Contact' });
// });
// router.get('/contact', indexController.displayContactPage);

// GET router for display login page
router.get('/login', indexController.displayLoginPage);

// POST router for processing login page
router.post('/login', indexController.processLoginPage);

// GET router for display the register page
router.get('/register', indexController.displayRegisterPage);

// POST router for processing the register page
router.post('/register', indexController.processRegisterPage);

// GET to perform userLogout
router.get('/logout', indexController.performLogout);

module.exports = router;
