let express = require('express');
let router = express.Router();
let doSurveyController = require('../controllers/dosurvey');


router.get('/:id', doSurveyController.displayHomePage);
router.post('/:id', doSurveyController.processSubmit);
router.get('/thankyou', doSurveyController.displayThankYouPage);

 


module.exports = router;