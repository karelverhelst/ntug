'use strict';
var dbConn = require('./../../config/db.config');
//reporter object create
var Reporter = function(reporter){
    this.name     = reporter.name;
};
Reporter.create = function (newRep, result) {
    dbConn.query("INSERT INTO reporter set ?", newRep, function (err, res) {
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
Reporter.findById = function (id, result) {
    dbConn.query("Select * from reporter where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Reporter.findAll = function (result) {
    dbConn.query("Select * from reporter", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Reporters : ', res);
            result(null, res);
        }
    });
};
Reporter.update = function(id, Reporter, result){
    dbConn.query("UPDATE reporter SET name=? WHERE id = ?", [Reporter.name, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
Reporter.delete = function(id, result){
    dbConn.query("DELETE FROM reporter WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= Reporter;