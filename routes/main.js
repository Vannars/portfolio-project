// Create a new router
const express = require("express") // require the express module
const router = express.Router()  // create a new router object
const {redirectLogin} = require('./redirectlogin') // make a cheeky redirectLogin function from the imported redirectlogin.js file
const request = require("request"); // require the request module

// Handle our routes
router.get('/', function(req, res, next){
    res.render('index.ejs')
})

router.get('/about', function(req, res, next){
    
    res.render('about.ejs')
})
module.exports = router; // make accessible to other files