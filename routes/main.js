const express = require("express"); // require the express module
const router = express.Router(); // create a new router object
// Handle our routes
router.get("/", function (req, res, next) {
  res.render("index.ejs");
});

router.get("/about", function (req, res, next) {
  res.render("about.ejs");
});
module.exports = router;