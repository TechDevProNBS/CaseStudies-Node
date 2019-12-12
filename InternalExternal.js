let dbfcon = require('./dbConnection');

module.exports = function internalExternal(req, res){
    let con = dbfcon();

    con.query("select distinct startdate from tdp_table", function(err, result){
        if(err){
            console.log("Error: " + err);
        } else {
            result.forEach(function(record){
                con.query("select count from tdp_table where startdate = " + record + " and internalexternal = 'internal'", function(err, result2){
                    if(err){
                        console.log("Error: " + err);
                    } else {
                        res.send(record + ":" + result2);
                    }
                })
            })
        }
    })

}