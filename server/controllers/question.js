let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create a reference to the DB scheme which is the model
let Question = require('../models/questions');
let Survey = require('../models/surveys');
//  We want to display the question list
module.exports.displayQuestionList = (req, res, next) => {
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
            // console.log(QuestionList);
            res.render('../views/question/index', {title: "Question List", questionList: questionList, surveyList: surveyList, displayName: req.user?req.user.displayName:'', slug: 'questions'});
                }});
        }
    });
}

module.exports.displayQuestionAddPage = (req, res, next) => {
    Survey.find((err, surveyList)=> {
        if (err) 
        {
            return console.error(err);
        } 
        else 
        {
            // console.log(QuestionList);
            res.render('../views/question/index', {title: "Question List", surveyList: surveyList, displayName: req.user?req.user.displayName:'', slug: 'questions_add'});
        }
        // res.render('../views/question/index', {title: "add Question", surveyList: surveyList, displayName: req.user?req.user.displayName:'', slug: 'questions_add'});
    });
}

module.exports.processQuestionAddPage = (req, res, next) => {
    let newQuestion = Question({
        "question_content": req.body.question,
        "survey_id": req.body.survey_id,
    });
    Question.create(newQuestion, (err, question) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/questions');
        }
    })
}

module.exports.displayQuestionEditPage = (req, res, next) => {
    let id = req.params.id;
    Question.findById({_id:id}, (err, questionToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            Survey.find((err, surveyList)=> {
                if (err) 
                {
                    return console.error(err);
                } 
                else 
                {
            res.render('question/index', {title: "Edit a Question", question: questionToEdit, surveyList: surveyList, displayName: req.user?req.user.displayName:'', slug: 'questions_edit'});
                }});
        }
    })

}

module.exports.processQuestionEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedQuestion = Question({
        "_id": id,
        "question_content": req.body.question,
        "survey_id": req.body.survey_id,
    });
    Question.updateOne({_id:id}, updatedQuestion, (err)=>{
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/questions');
        }
    });
}

module.exports.processQuestionDeletePage = (req, res, next) => {
    let id = req.params.id;
    Question.remove({_id:id}, (err)=> {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/questions");
        }
    });
}