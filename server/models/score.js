let mongoose = require('mongoose');
let scoreModel = mongoose.Schema({
    question_id    : String,
    score      : Number,
    // 1- Strong Disagree
    // 2- Disagree
   //  3-Neutral
   //  4- Agree
  //   5 Strongly Agree

    survey_id           : String
},
{
    collection: "score"
});

module.exports = mongoose.model('score', scoreModel);