let mongoose = require('mongoose');
let questionsModel = mongoose.Schema({
    question_content    : String,
    // question_order      : Number,
    survey_id           : String,
},
{
    collection: "questions"
});

module.exports = mongoose.model('questions', questionsModel);