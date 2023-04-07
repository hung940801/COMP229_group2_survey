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

module.exports.apiGetQuestionList = (req, res, next) => {
    Question.find((err, questionList)=> {
        let list = []
        for (let i = 0; i < questionList.length; i++) {
            s = {
                "id": questionList[i]._id,
                "question_content": questionList[i].question_content,
                "survey_id": questionList[i].survey_id,
            }
            list.push(s);
        }
        res.send(list);
    });
}

module.exports.apiGetQuestionByID = (req, res, next) => {
    let id = req.params.id;
    Question.findById({_id:id}, (err, questionToEdit)=> {
        // let list = {}
        // for (let i = 0; i < questionList.length; i++) {
        //     s = {
        //         "id": questionList[i]._id,
        //         "question_content": questionList[i].question_content,
        //         "survey_id": questionList[i].survey_id,
        //     }
        //     list = s;
        // }
        res.send(questionToEdit);
    });
}

module.exports.apiGetQuestionBySurvey = (req, res, next) => {
    let survey_id = req.params.id;
    Question.find({survey_id:survey_id}, (err, questionList)=> {
        let list = []
        for (let i = 0; i < questionList.length; i++) {
            s = {
                "id": questionList[i]._id,
                "question_content": questionList[i].question_content,
                "survey_id": questionList[i].survey_id,
            }
            list.push(s);
        }
        res.send(list);
        // res.send(questionsList);
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

module.exports.apiAddQuestion = (req, res, next) => {
    let newQuestion = Question({
        "question_content": req.body.question_content,
        "survey_id": req.body.survey_id,
    });
    Question.create(newQuestion, (err, question) => {
        if (err) {
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
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

module.exports.apiEditQuestion = (req, res, next) => {
    let id = req.body.id;
    let updatedQuestion = Question({
        "_id": id,
        "question_content": req.body.question_content,
        "survey_id": req.body.survey_id,
    });
    Question.updateOne({_id:id}, updatedQuestion, (err)=>{
        if (err) {
            console.log(err);
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
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
module.exports.apiDeleteQuestion = (req, res, next) => {
    let id = req.params.id;
    Question.deleteOne({_id:id}, (err)=> {
        if (err) {
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
        }
    });
}