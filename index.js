//Import express, mysql, express-session, ejs, express-sanitizer, express-validator
var express = require('express');
var ejs = require('ejs');
const expressSanitizer = require('express-sanitizer');
var validator = require('express-validator');

require('dotenv').config();
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;


//Import mysql (mysql2)
//this will  be used to connect to the database
var mysql = require('mysq2l');

//Import express-session
//this will store the session data
var session = require('express-session');
const [rediectLogin] = require('./rediectLogin');


//Express app object
const app = express();
const port = 8000;

//Ejs template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(expressSanitizer());

const db = mysql.createConnection({
    host:'localhost',
    user: 'portfolio_user',
    password: 'password',
    database: 'portfolio_db'
});

db.connect( (err) => {
    if(err){
        throw err;
    }
    console.log('Connected to database');
    })
global.db = db;

// Create session 
// the secret paramater is used to create a session is (sign the cookie id with this secret)
app.use(session({
    secret: 'secretsession',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))