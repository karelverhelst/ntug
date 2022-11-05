//- MYSQL Module
try{
    var mysql = require('mysql');
}catch(err){
    console.log("Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`.");
}
// create a new connection pool

var db_config = {
  host: "mariadb.default.svc.cluster.local",
  user: "root",
  password: "Netapp12",
  database: "karel_app"
};

var dbConn = mysql.createPool(db_config);

dbConn.getConnection(function(err){
    if(err) {
        // mysqlErrorHandling(dbConn, err);
        console.log("\n\t *** Cannot establish a connection with the database. ***");

        dbConn = reconnect(dbConn);
    }else {
        console.log("\n\t *** New dbConn established with the database. ***")
    }
});


//-
//- RedbConn function
//-
function reconnect(dbConn){
    console.log("\n New connection tentative...");

    //- Create a new one
    dbConn = mysql.createPool(db_config);

    //- Try to reconnect
    dbConn.getConnection(function(err){
        if(err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect(dbConn), 2000);
        }else {
            console.log("\n\t *** New connection established with the database. ***")
            return dbConn;
        }
    });
}


//-
//- Error listener
//-
dbConn.on('error', function(err) {

    //-
    //- The server close the dbConn.
    //-
    if(err.code === "PROTOCOL_dbConn_LOST"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(dbConn);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(dbConn);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(dbConn);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
    }

    else{
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(dbConn);
    }

});


//-
//- Export
//-
module.exports = dbConn;

