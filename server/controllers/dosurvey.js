let express = require('express');
const passport = require('passport');
let router = express.Router();

let Question = require('../models/questions');
let Survey = require('../models/surveys');
let Score = require('../models/score');

module.exports.displayHomePage = (req, res, next) => {


    let id = req.param('id');
    Question.find({survey_id:id},(err,questionList)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
    res.render('../views/dosurvey/index', {title: "Do Survey",  displayName: req.user?req.user.displayName:'', questionList: questionList, survey_id:id});
        }
            
});
}

module.exports.processSubmit = (req, res, next) => {
    console.log('*********');
    console.log('preocss submit');
    let survey_id = req.param('survey_id');
    console.log('survey_id='+survey_id);
    Question.find({survery_id:survey_id},(err,questionList)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }else{
            console.log("success");
            for(var i=0; i < questionList.length; i++) {
                console.log(i);
                q_id=questionList[i].id;
                val=req.param(q_id);
                //console.log(questionList[i].id+","+questionList[i].question_content+",val="+val);
                let newScore = Score({
                    "score": val,
                    "survey_id": survey_id,
                    "question_id": q_id

                });
                Score.create(newScore, (err, score) => {
                    if (err) {
                        console.log(err);
                        res.end(err);
                    } else {
                        console.log("A score record has been created!");
                    }
                })
            
            
            }   

        }
    
    
    });
    
    
    return res.redirect('/home');
}


module.exports.displayThankYouPage = (req, res, next) => {
    res.render('dosurvey/thankyou',{});
}