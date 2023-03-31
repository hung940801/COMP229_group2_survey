let express = require('express');
const passport = require('passport');
let router = express.Router();

// create the userModel instance
let UserModel = require('../models/user');
let User = UserModel.User;

let Question = require('../models/questions');
let Survey = require('../models/surveys');

module.exports.displayHomePage = (req, res, next) => {
    Question.find((err, questionList)=> {
        if (err) 
        {
            return console.error(err);
        } 
        else 
        {
            Survey.find((err, surveyList)=> {
                if (err) 
                {
                    return console.error(err);
                } 
                else 
                {
    res.render('index', {title: "Home", displayName: req.user?req.user.displayName:'', surveyList: surveyList, questionList: questionList});
                }
            });
        }
    });
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user already login
    if (!req.user)
    {
        res.render('auth/login', 
            {
                title: "Login",
                message: req.flash('loginMessage'),
                displayName: req.User?req.User.displayName:""
            }
        );
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // server err
        if (err) {
            return next(err);
        }
        // check if there is a user login error
        if (!user) {
            req.flash('loginMessage', "Authenticate error");
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error?
            if (err) {
                return next(err);
            }
            return res.redirect('/surveys');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // chekc if the user is not already login
    if (!req.user) {
        res.render('auth/register', 
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user?req.user.displayName:''
            }
        );
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // initialize a user object
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName,
    });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: inserting new user");
            if (err.name == "UserExists Error") {
                req.flash(
                    'registerMessage',
                    'Registration Error: user already existed!'
                );
                console.log("Error: user already existed!");
            }
            return res.render('auth/register', 
                {
                    title: 'Register',
                    message: req.flash('registerMessage'),
                    displayName: req.user? req.user.displayName:""
                }
            );
        } else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/surveys');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
}