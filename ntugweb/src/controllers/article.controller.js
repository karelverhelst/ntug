'use strict';
const Article = require('../models/article.model');
exports.findAll = function(req, res) {
    Article.findAll(function(err, article) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', article);
        res.send(article);
    });
};
exports.create = function(req, res) {
    const new_article = new Article(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required fields' });
    }else{
        Article.create(new_article, function(err, article) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Article added successfully!",data:article});
        });
    }
};
exports.findById = function(req, res) {
    Article.findById(req.params.id, function(err, article) {
        if (err)
            res.send(err);
        res.json(article);
    });
};
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required fields' });
    }else{
        Article.update(req.params.id, new Article(req.body), function(err, article) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'Article successfully updated' });
        });
    }
};
exports.delete = function(req, res) {
    Article.delete( req.params.id, function(err, article) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'Article successfully deleted' });
    });
};