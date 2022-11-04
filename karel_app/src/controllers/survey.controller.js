'use strict';
const survey = require('../models/survey.model');
exports.findAll = function(req, res) {
    survey.findAll(function(err, survey) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', survey);
        res.send(survey);
    });
};
exports.create = function(req, res) {
    const new_survey = new survey(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        survey.create(new_survey, function(err, survey) {
            if (err)
                res.send(err);
            res.json({error:false,message:"survey added successfully!",data:survey});
        });
    }
};
exports.findById = function(req, res) {
    survey.findById(req.params.id, function(err, survey) {
        if (err)
            res.send(err);
        res.json(survey);
    });
};
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        survey.update(req.params.id, new survey(req.body), function(err, survey) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'survey successfully updated' });
        });
    }
};
exports.delete = function(req, res) {
    survey.delete( req.params.id, function(err, survey) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'survey successfully deleted' });
    });
};
