let mongoose = require('mongoose');
let surveysModel = mongoose.Schema({
    name        : String,
    description : String,
    // fromDate    : Date,
    // toDate      : Date,
    // questions   : [
    //     {
    //         type    : mongoose.Schema.Types.ObjectId,
    //         ref     : "questions"
    //     }
    // ]
},
{
    collection: "surveys"
});

module.exports = mongoose.model('surveys', surveysModel);