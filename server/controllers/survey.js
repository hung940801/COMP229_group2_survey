let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create a reference to the DB scheme which is the model
let Survey = require('../models/surveys');
//  We want to display the survey list
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList)=> {
        if (err) 
        {
            return console.error(err);
        } 
        else 
        {
            // console.log(SurveyList);
            res.render('../views/survey/index', {title: "Survey List", surveyList: surveyList, displayName: req.user?req.user.displayName:'', slug: 'surveys'});
        }
    });
}

module.exports.displaySurveyAddPage = (req, res, next) => {
    res.render('../views/survey/index', {title: "add Survey", displayName: req.user?req.user.displayName:'', slug: 'surveys_add'});
}

module.exports.processSurveyAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "description": req.body.description,
    });
    Survey.create(newSurvey, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/surveys');
        }
    })
}

module.exports.displaySurveyEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById({_id:id}, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('survey/index', {title: "Edit a Survey", survey: surveyToEdit, displayName: req.user?req.user.displayName:'', slug: 'surveys_edit'});
        }
    })

}

module.exports.processSurveyEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "description": req.body.description,
    });
    Survey.updateOne({_id:id}, updatedSurvey, (err)=>{
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/surveys');
        }
    });
}

module.exports.processSurveyDeletePage = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({_id:id}, (err)=> {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/surveys");
        }
    });
}