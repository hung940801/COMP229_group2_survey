// require modules for the user model
let mongoose = require('mongoose');
let passport_local_mongoose = require('passport-local-mongoose');
let user = mongoose.Schema({
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required',
    },
    password: 
    {
        type: String,
        default: '',
        trim: true,
        required: 'password is required',
    },
    email:
    {
        type: String,
        default: '',
        trim: true,
        required: 'email is required',
    },
    displayName: 
    {
        type: String,
        default: '',
        trim: true,
        required: "display name is required",
    },
    created: 
    {
        type: Date,
        default: Date.now,
    },
    update:
    {
        type: Date,
        default: Date.now,
    },
},
{
    collection: 'users'
}
);

// configure options for user nodel
let options = ({missingPasswordError: "wrong/Missing Password"});
user.plugin(passport_local_mongoose, options),
module.exports.User = mongoose.model('user', user)