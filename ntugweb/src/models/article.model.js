'use strict';
var dbConn = require('../../config/db.config');
//article object create
var Article = function(article){
    this.title     = article.title;
    this.article     = article.article;
    this.url = article.url;
    this.reporter_id = article.reporter_id;
};
Article.create = function (newRep, result) {
    dbConn.query("INSERT INTO article set ?", newRep, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Article.findById = function (id, result) {
    dbConn.query("Select * from article where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Article.findAll = function (result) {
    dbConn.query("SELECT article.id,article.title,article.article,DATE_FORMAT(article.date, '%Y-%m-%d %H:%i:%s') AS `date`,article.url,article.reporter_id,reporter.name FROM article,reporter WHERE article.reporter_id=reporter.id", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Articles : ', res);
            result(null, res);
        }
    });
};
Article.update = function(id, Article, result){
    dbConn.query("UPDATE article SET title=? WHERE id = ?", [Article.title, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
Article.delete = function(id, result){
    dbConn.query("DELETE FROM article WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= Article;