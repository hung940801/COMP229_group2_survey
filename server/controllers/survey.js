let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create a reference to the DB scheme which is the model
let Survey = require('../models/surveys');
let Question = require('../models/questions');
let Score = require('../models/score');
//  We want to display the survey list
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList)=> {
        if (err) 
        {
            return console.error(err);
        } 
        else 
        {
            console.log(surveyList);
            res.render('../views/survey/index', {title: "Survey List", surveyList: surveyList, displayName: req.user?req.user.displayName:'', slug: 'surveys'});
        }
    });
}

module.exports.apiGetSurveyList = (req, res, next) => {
    Survey.find((err, surveyList)=> {
        let list = []
        for (let i = 0; i < surveyList.length; i++) {
            s = {
                "id": surveyList[i]._id,
                "name": surveyList[i].name,
                "description": surveyList[i].description,
            }
            list.push(s);
        }
        // if (err) 
        // {
        //     // res.status(500).send({
        //     //     message:
        //     //     err.message || "Some error occurred while retrieving tutorials."
        //     // });
        // } 
        // else 
        // {
            // console.log(surveyList);
            res.send(list);
            // res.send('Get All API')
        // }
    });
}

module.exports.apiGetSurveyByID = (req, res, next) => {
    let id = req.params.id;
    Survey.findById({_id:id}, (err, surveyToEdit)=> {
        // let list = []
        // for (let i = 0; i < surveyList.length; i++) {
        //     s = {
        //         "id": surveyList[i]._id,
        //         "name": surveyList[i].name,
        //         "description": surveyList[i].description,
        //     }
        //     list.push(s);
        // }
        // if (err) 
        // {
        //     // res.status(500).send({
        //     //     message:
        //     //     err.message || "Some error occurred while retrieving tutorials."
        //     // });
        // } 
        // else 
        // {
            // console.log(surveyList);
            // res.send(list);
            // res.send('Get All API')
        // }
        res.send(surveyToEdit);
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

module.exports.apiAddSurvey = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "description": req.body.description,
    });
    Survey.create(newSurvey, (err, survey) => {
        if (err) {
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
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

module.exports.apiEditSurvey = (req, res, next) => {
    let id = req.body.id;
    let updatedSurvey = Survey({
        // "_id": id,
        "name": req.body.name,
        "description": req.body.description,
    });
    Survey.updateOne({_id:id}, updatedSurvey, (err)=>{
        if (err) {
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
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
module.exports.apiDeleteSurvey = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({_id:id}, (err)=> {
        if (err) {
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
        }
    });
}

module.exports.apiDoSurvey = (req, res, next) => {
    console.log(req.body);
    let survey_id = req.body.survey_id;
    let questions = req.body.questions;
    questions.map((quest, index) => {
        let newScore = Score({
            "question_id": quest.id,
            "score": quest.answer,
            "survey_id": survey_id,
        });
        Score.create(newScore, (err, score) => {
            if (err) {
                console.log(err);
            }
        })
    });
    res.status(200).json({ success: true });
}

module.exports.displaySurveyResultPage = (req, res, next) => {
    console.log("*********************");
    console.log("*** Show result: ***");
    console.log("*********************");
    
    Survey.find((err, surveyList)=> {
        Question.find((err, questionList)=> {
            Score.find((err, scoreList)=> {
                //survey->questions
                survey_questions={};
                map_questions=[];
                //count the number of poll for an question's score(1 or 2 or 3 or 4 or 5)
                scores_cnt=[];
                //Count the total number of poll for an question
                answers_cnt=[];
                
                //for each survey
                for (let i = 0; i < surveyList.length; i++) {
                    survey_id=surveyList[i]._id;
                    questions=[];
                    for (let j = 0; j < questionList.length; j++) {
                        question_id=questionList[j]._id;
                        map_questions[question_id]=questionList[j].question_content;
                        question_s_id=questionList[j].survey_id;
                        // if question under survey 
                        if(question_s_id==survey_id){
                            questions.push(question_id);
                        }
                        for (let k=0;k<scoreList.length;k++){
                            score_survey_id=scoreList[k].survey_id;
                            score_question_id=scoreList[k].question_id;
                            score_value=scoreList[k].score;
                            //handle match record only!
                            if(score_survey_id==survey_id && score_question_id==question_id){
                                
                                rec_id=score_survey_id+"_"+score_question_id;
                                rec_id2=rec_id+"_"+score_value;
                                
                                if(typeof (scores_cnt[rec_id2])==='undefined'){
                                    scores_cnt[rec_id2]=1;
                                    
                                }else{
                                    scores_cnt[rec_id2]+=1;
                                }
                                
                                let cnt=0;
                                
                                if(typeof(answers_cnt[rec_id])==='undefined'){
                                answers_cnt[rec_id]=1;
                                
                                }else{
                                answers_cnt[rec_id]+=1;
                                }
                            }
                        }
                    }
                    survey_questions[survey_id]=questions;
                }//end survey loop  
                    
                console.log("surveyList.length:"+surveyList.length);
                console.log("questionList.length:"+questionList.length);
                console.log("scoreList.length:"+scoreList.length);
                
                console.log("*********************");
                console.log("*** end result: ***");
                console.log("*********************");
                res.render('../views/survey/index', {title: "Survey Result", surveyList: surveyList, surveyQuestions: survey_questions, answersCnt:answers_cnt ,questionMap:map_questions, scoresCnt:scores_cnt, displayName: req.user?req.user.displayName:'', slug: 'surveys_result'});
            });
        });
    });
}

module.exports.apiGetSurveyResult = (req, res, next) => {
    let survey_id = req.params.id;
    let questions_result = {};
    Survey.findById({_id:survey_id}, (err, survey)=> {
        Question.find({survey_id:survey_id}, (err, questions) => {
            Score.find({survey_id:survey_id}, (err, score_set) => {
                let questionRes = [];
                questions.map((question, index) => {
                    let answerCount = 0;
                    let answer = {
                        'ans_1': 0,
                        'ans_2': 0,
                        'ans_3': 0,
                        'ans_4': 0,
                        'ans_5': 0,
                    };
                    score_set.map((score, ind) => {
                        if (question._id == score.question_id) {
                            s = 'ans_' + score.score;
                            if (typeof answer[s] == 'undefined') {
                                if (score.score != null) {
                                    answer[s] = 1
                                }
                            } else {
                                if (s != null) {
                                    answer[s] += 1
                                }
                            }
                            answerCount += 1;
                        }
                    })
                    questionRes.push({
                        question_id: question._id,
                        details: question,
                        answerCount: answerCount,
                        result: answer
                    })
                })
                questions_result = {
                    survey: survey,
                    questions: questionRes,
                };
                // console.log(questions_result);
                res.send(questions_result);
            });
        });
    });
}