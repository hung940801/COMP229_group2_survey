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
// surveysModel.method("toJSON", function() {
//     const s = {};
//     const { __v, _id, name , description } = this.toObject();
//     s.id = _id;
//     s.name = name;
//     s.description = description;
//     return s;
// });

module.exports = mongoose.model('surveys', surveysModel);