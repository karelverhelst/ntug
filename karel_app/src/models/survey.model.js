'use strict';
var dbConn = require('./../../config/db.config2');
//survey object create
var survey = function(survey){
    this.name     = survey.name;
    this.company  = survey.company;
    this.expectations = survey.expectations;
    this.hyp_azure = survey.hyp_azure;
    this.hyp_gcp = survey.hyp_gcp;
    this.hyp_aws = survey.hyp_aws;
    this.na_ontap = survey.na_ontap;
    this.na_cloudmanager = survey.na_cloudmanager;
    this.na_cvo = survey.na_cvo;
    this.na_cvs_anf = survey.na_cvs_anf;
    this.na_cloud_insight = survey.na_cloud_insight;
    this.na_cloudsync = survey.na_cloudsync;
};
survey.create = function (newRep, result) {
    dbConn.query("INSERT INTO survey set ?", newRep, function (err, res) {
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
survey.findById = function (id, result) {
    dbConn.query("Select * from survey where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
survey.findAll = function (result) {
    dbConn.query("Select * from survey", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('surveys : ', res);
            result(null, res);
        }
    });
};
survey.update = function(id, survey, result){
    dbConn.query("UPDATE survey SET name=? WHERE id = ?", [survey.name, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
survey.delete = function(id, result){
    dbConn.query("DELETE FROM survey WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= survey;
