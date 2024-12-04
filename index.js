//==================================================IMPORTS==================================================
//Import dotenv
require('dotenv').config();

// Import express, ejs, express-validator, express-sanitizer, mysql, express-session 
var express = require ('express');
var ejs = require('ejs');
var validator = require ('express-validator');
const expressSanitizer = require('express-sanitizer');

//Import mysql module
var mysql = require('mysql2');

//Import express-session module
var session = require('express-session');

//Import twitch api
const clientId = process.env.TWITCH_CLIENT_ID; // taken from .env file
const clientSecret = process.env.TWITCH_CLIENT_SECRET; // also taken from .env file


//==================================================EXPRESS AND EJS SETUP==================================================
//Express app initialization
const app = express();
const port = 8000;

//Ejs setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(expressSanitizer());

//==================================================DATABASE CONNECTION==================================================
//Create connection pool to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to database');
    })

global.db = db;

//==================================================SESSION SETUP==================================================
// Create session 
// the secret paramater is used to create a session is (sign the cookie id with this secret)
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

//==================================================ROUTE HANDLING==================================================
// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the route handlers for /reviews
app.locals.siteData = { siteName: 'GoldGameReviews' };
const reviewsRoutes = require('./routes/reviews')
app.use('/reviews', reviewsRoutes)


// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))