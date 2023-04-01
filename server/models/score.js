let mongoose = require('mongoose');
let scoreModel = mongoose.Schema({
    question_id    : String,
    score      : Number,
    survey_id           : String
},
{
    collection: "score"
});

module.exports = mongoose.model('score', scoreModel);