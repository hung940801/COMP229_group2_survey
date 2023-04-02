let express = require('express');
let router = express.Router();
let indexController = require('../../controllers/index');


// POST router for processing login page
router.post('/login', indexController.processApiLogin);

// GET router for display the register page
// router.get('/register', indexController.displayRegisterPage);

// // POST router for processing the register page
// router.post('/register', indexController.processRegisterPage);

// // GET to perform userLogout
// router.get('/logout', indexController.performLogout);

module.exports = router;
