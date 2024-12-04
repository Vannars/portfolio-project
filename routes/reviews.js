const express = require("express")
const router = express.Router()
const {redirectLogin} = require('./redirectlogin')
const request = require("request")
const { check, validationResult, body} = require('express-validator')

// Route to the search page
router.get('/search', function(req, res, next){
    res.render("search.ejs")
})

//==================================================Twitch API==================================================
//ID AND ACCESS TOKEN
const clientId = process.env.TWITCH_CLIENT_ID;
const accessToken = process.env.ACCESS_TOKEN; 

//POST REQUEST TO THE API
router.post('/search_result', function(req, res, next) { 
    const search = req.body.search_text; //  take the users search input from the form

    //BUILDING A REQUEST OBJECT -request moduel
    // const gamedata is the request object, 
    // url is the api address, headers are the client id and access token (ie user credentials)
    // body is the api query - id, name and release date of the game
    const gamedata = {
        url: `https://api.igdb.com/v4/games`,
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
        },
        body: `search "${search}"; fields id, name, first_release_date;`
    };
    // POST REQUEST USING THE REQUEST OBJECT - request module
    request.post(gamedata, function(err, response, body) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            // I only want the first occurance of the game in the list
            // firstInList stores an array of games
            // seenGames stores names of games that are already in that array
            const firstInList = [];
            const seenGames = new Set();
            const games = JSON.parse(body); //json body
            ///check each game  - if it !seen, add to firstInList
            games.forEach(game =>{
                if (!seenGames.has(game.name)){
                    firstInList.push(game);
                    seenGames.add(game.name);
                }
            });      
            res.render('search_results.ejs', { data: firstInList }); // data is the array created above
        }
    });
});

router.get('/list', redirectLogin, function(req, res, next) {
    let sqlquery = "SELECT * FROM reviews" // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("reviews_list.ejs", {reviews_list:result})
     })
})

router.get('/postreview', redirectLogin, function (req, res, next) {
    res.render('postreview.ejs')
})

router.post('/reviewposted', redirectLogin, [check('title').isLength({min: 1}), check('score').isNumeric()],
 function (req, res, next) {
    const errors  = (validaitionResult(req));  
    if (!errors.isEmpty()){
    res.redirect('./postreview')
    } else {    
     // saving data in database
    let sqlquery = "INSERT INTO reviews (game_id, user_id, title, review_text, score) VALUES (?,?,?,?,?)"

    // execute sql query
    let newrecord = [req.body.game_id, req.session.userId, req.body.title, req.body.review_text, req.body.score] 
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(' This review posted to database, name: '+ req.body.title + ' score '+ req.body.score, 'by user: '+ req.session.userId)
    })
 }
}); 

router.get('/topgames', redirectLogin, function(req, res, next) {
    let sqlquery = "SELECT * FROM reviews WHERE score > 8"
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("topreviews.ejs", {reviews_list:result})
    })
}) 


// Export the router object so index.js can access it
module.exports = router;