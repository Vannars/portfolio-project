// Create a new router
const express = require("express") // require the express module
const router = express.Router()  // create a new router object
const {redirectLogin} = require('./redirectlogin') // make a cheeky redirectLogin function from the imported redirectlogin.js file
const request = require("request"); // require the request module

router.get('/', function(req, res, next) { // route for the home page
   
    res.render('index.ejs', {title:home}); // index.ejs will render with the titlle 'home'
});

module.exports = router; // make accessible to other files