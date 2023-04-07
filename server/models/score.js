let mongoose = require('mongoose');
let scoreModel = mongoose.Schema({
    question_id : String,
    survey_id   : String,
    created     : 
    {
        type    : Date,
        default : () => Date.now() - 4*60*60*1000, // changed to canada time
    },
    score       : Number,
    // 1 - Strong Disagree
    // 2 - Disagree
    // 3 - Neutral
    // 4 - Agree
    // 5 - Strongly Agree
},
{
    collection: "score"
});

module.exports = mongoose.model('score', scoreModel);