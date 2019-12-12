var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

const upload = require('./upload')

var mySql = require("./dbconnection");
var mySql2 = require('./dbConnection2');
var con = mySql();
var con2 = mySql2();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
//var cors = require('cors');



//app.use(cookieparser());
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(cors());


app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

const cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
  
  app.use(cors(corsOptions))
  
app.post('/upload', upload)

//var user = "";

app.post('/login', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;


        var query = `SELECT * FROM users WHERE username = '${username}' AND pass = '${password}'` 

        console.log(query)
       
        con.query(query , function (error, results, feilds) {

            if (error) {
                console.log(error)
            } 
            
            else {

                if (results.length == 0) {
                    var errorData = {
                        'username': 'No User Found'
                    }
                    console.log('Error');
                    res.status(205).send(errorData);
                }


                else {
                    console.log(results)
                    req.session.loggedin = true;
                    req.session.username = results[0].username;
                    req.session.name = results[0].name;
                    req.session.role = results[0].role;
                    //user = results[0].username;

                    var sessionData = {
                        'username': req.session.username
                        //'name': req.session.name               
                    }


                    res.status(200).send(JSON.stringify(sessionData));
                }
            }

            
            
       
        });
 
});

// app.get('/logincheck', function (req, res) {


//     if(user != ""){
//         var sessionData = {
//             'loggedin': "true"           
//         }
//         res.status(200).send(JSON.stringify(sessionData));
//     }
//     else{
//         var sessionData = {
//             'loggedin': "false"           
//         }
//         res.status(200).send(JSON.stringify(sessionData));
//     }
// });

// app.get('/logout', function (req, res){
//     user = "";
// });

app.get("/stats", function (request, response) {
    //console.log("select count(id) as results from tdp_table where startdate = 'Sep 2019' and internalexternal = 'internal'")
    let data = [];
    con2.query("select count(*) as count, startdate,internalexternal from tdp_table  group by startdate,internalexternal", function(err, result2){
        if(err){
            console.log("Error: " + err);
        } else {
            // response.send(JSON.stringify(result2))
            for(let i = 0; i < result2.length; i++){
                data.push(result2[i].startdate)
                
                //not the last element
                if(i != result2.length-1){
                    //date has both internal and external
                    if(result2[i].startdate == result2[i+1].startdate){
                        data.push(result2[i].count)
                        data.push(result2[i+1].count)
                        i++
                    } else {
                        if(result2[i].internalexternal == 'internal'){
                            data.push(0)
                            data.push(result2[i+1].count)
                        } else {
                            data.push(result2[i].count)
                            data.push(0)
                        }
                    }
                } else {
                    if(result2[i].internalexternal == 'internal'){
                        data.push(0)
                        data.push(result2[i+1].count)
                    } else {
                        data.push(result2[i].count)
                        data.push(0)
                    }
                }

            }
            response.send(data);
        }
    })
});

app.listen(4500);
