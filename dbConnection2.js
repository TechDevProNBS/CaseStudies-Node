let mysql = require('mysql');
module.exports=function connection(){
    let con = mysql.createConnection({
        host:"35.246.145.190",
        user:"root",
        password:"TDPSOFTWARE",
        database:"GroupProject"
    });

    con.connect(function(err){
        if(err){
            console.log("error in connection");
        } else {
            console.log("Connected");
        }
    });
    return con;
};