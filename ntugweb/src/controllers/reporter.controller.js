'use strict';
const Reporter = require('../models/reporter.model');
exports.findAll = function(req, res) {
    Reporter.findAll(function(err, reporter) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', reporter);
        res.send(reporter);
    });
};
exports.create = function(req, res) {
    const new_reporter = new Reporter(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Reporter.create(new_reporter, function(err, reporter) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Reporter added successfully!",data:reporter});
        });
    }
};
exports.findById = function(req, res) {
    Reporter.findById(req.params.id, function(err, reporter) {
        if (err)
            res.send(err);
        res.json(reporter);
    });
};
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Reporter.update(req.params.id, new Reporter(req.body), function(err, reporter) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'Reporter successfully updated' });
        });
    }
};
exports.delete = function(req, res) {
    Reporter.delete( req.params.id, function(err, reporter) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'Reporter successfully deleted' });
    });
};