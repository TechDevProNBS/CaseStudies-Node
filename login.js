var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var mySql = require("./dbconnection");
var con = mySql();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

app.post('/login', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;


        var query = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'` 

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


                    var sessionData = {
                        'username': req.session.username,
                        'name': req.session.name,
                        'role': req.session.role
                    
                    }

                    res.status(200).send(JSON.stringify(sessionData));

                }
                }

            
            
       
        });
 
});


app.listen(4500);
