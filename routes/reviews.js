const express =require("express");
const router =express.Router();
const { redirectLogin } =require("./redirectlogin");
const request =require("request");
const { check, validationResult } = require("express-validator");
const { apisearch } =require("./apisearch");
const clientId =process.env.TWITCH_CLIENT_ID;
const accessToken =process.env.ACCESS_TOKEN;

// Route to the search page
router.get("/search", function (req, res, next) 
{
  res.render("search.ejs");
});

//POST REQUEST TO APISEARCH - idgb database
router.post("/search_result", function (req, res, next) 
{
  // this route allows the user to search the idgb database for games
  const search = req.body.search_text; //  take the users search input from the form

  apisearch(search, (err, firstInList) => {
    // see apisearch
    if (err) {
      console.log(err);
      return next(err);
    }
    res.render("search_results.ejs", { data: firstInList }); // the result of api search is used in the ejs file to display search results
  });
});

router.get("/list", function (req, res, next) 
{
  let sqlquery = "SELECT * FROM reviews"; //  this query  means it will selct all the reviews from the reviews table
  db.query(sqlquery, (err, result) => {
    // here is the actual query to the databse
    if (err) {
      next(err);
    }
    res.render("reviews_list.ejs", { reviews_list: result }); // the result is used in the ejs file to display the reviews
  });
});

router.get("/review/:id", function (req, res, next) {
  const reviewId = req.params.id;
  let sqlquery = "SELECT * FROM reviews WHERE id = ?"; // query to get the review by ID
  db.query(sqlquery, [reviewId], (err, result) => {
    if (err) {
      return next(err);
    } else if (result.length === 0) {
      return res.send("Review not found");
    }
    res.render("reviewbypost.ejs", { review: result[0] }); // render the review.ejs view with the review data
  });
});

router.get("/postreview/:gameTitle", redirectLogin, function (req, res, next) {
  // This get request occurs when the user selects create a review from the search results
  // the following definitions are taken from the search results page and are inserted into the postreview page (this is convenient for inserting this data into the database)
  const gameTitle =req.params.gameTitle;
  const gameId =req.query.gameId;
  const gameDate =req.query.gameDate;
  res.render("postreview.ejs", {
    gameTitle: gameTitle,
    gameId: gameId,
    gameDate: gameDate,
  });
});

router.post(
  "/reviewposted",
  redirectLogin,
  [check("score").isNumeric()], // this an arbitrary check to see if the score is a number - not really needed but it is an example of express-validator
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect(
        `/reviews/postreview/${encodeURIComponent(req.body.gameTitle)}?gameId=${
          req.body.gameId
        }&gameDate=${req.body.gameDate}`
      ); // basically redirects to the postreview page
    }
    //assuming it all went well, these definitions - including the user input from the ejs page - form the structure of the query to insert the review into the database
    const game_name =req.body.gameTitle; // the name of the game
    const headline =req.body.headline; // the headline of the review
    const gameId =req.body.gameId; // the numbered game id
    const gameDate =new Date(req.body.gameDate * 1000)
      .toISOString()
      .split("T")[0]; // Unix to date conversion (what a pain)
    const score = req.body.score; // the user's review score
    const review_text = req.body.review_text; // the users text for the review
    let sqlquery = "SELECT game_id FROM games WHERE name = ?"; // this is the game selection query (we check if it is in the database)
    let sqlinsertreview =
      "INSERT INTO reviews (game_id, username, game_name, headline, score, review_text) VALUES (?,?,?,?,?,?)"; // this is the review insertion query - its a bit long
    // Define a const to hold the game name (formality)
    const game =[game_name];
    //A query to first check if the game is in the database already
    db.query(sqlquery, game, (err, result) => {
      if (err) {
        return next(err);
      }
      // If the game exists, insert the review in the database
      if (result.length > 0) {
        const game_id =result[0].game_id; // the game's id
        const username =req.session.userId; // the current user (who is posting it)
        const review =[ // reviews details array - the params etc
          game_id,
          username,
          game_name,
          headline,
          score,
          review_text,
        ];
        db.query(sqlinsertreview, review, (err, result) => { //query to the paramaters in review array
          if (err) {
            return next(err);
          }
          res.redirect("/reviews/list");
        });
      } else {
        // Otherwise this will insert the game into the games table and then insert the review into the reviews table
        let sqlinsertgame =
          "INSERT INTO games (game_id, name, release_date) VALUES (?,?,?)";
        const game =[gameId, game_name, gameDate];
        db.query(sqlinsertgame, game, (err, result) => {
          if (err) {
            return next(err);
          }
          const username = req.session.userId;
          const review= [
            gameId,
            username,
            game_name,
            headline,
            score,
            review_text,
          ];
          db.query(sqlinsertreview, review, (err, result) => {
            if (err) {
              return next(err);
            }
            res.redirect("/reviews/list"); // will render the list of made reviews
          });
        });
      }
    });
  }
);

router.get("/topreviews", function (req, res, next) {
  // just some database querying to get the top reviews - an example really
  let sqlquery ="SELECT * FROM reviews WHERE score > 8";
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("topreviews.ejs", { reviews_list: result });
  });
});

router.get("/search_bygame", function (req, res, next) {
  res.render("searchbygame.ejs");
});

router.get("/search_bygame_result",function (req, res, next) {
  // Search the database
  let sqlquery =
    "SELECT * FROM reviews WHERE game_name LIKE '%" +
    req.query.search_text +
    "%'"; // query database to get all the games that match
  // execute sql query
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("listbygame.ejs",{ reviews_list: result });
  });
});
module.exports = router;