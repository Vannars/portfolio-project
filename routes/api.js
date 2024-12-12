const express = require("express");
const router = express.Router();

// Gets a list of all reviews
router.get("/reviews", (req, res, next) => {
  let sqlquery = "SELECT * FROM reviews";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(result);
  });
});

// Gets a review by ID
router.get("/reviews/:id", (req, res, next) => {
  const reviewId = req.params.id;
  let sqlquery = "SELECT * FROM reviews WHERE id = ?";
  db.query(sqlquery, [reviewId], (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    } else if (result.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result[0]);
  });
});

// Deletes a review by ID
router.delete("/reviews/:id", (req, res, next) => {
  const reviewId = req.params.id;
  let sqldelete = "DELETE FROM reviews WHERE id = ?";
  db.query(sqldelete, [reviewId], (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Not found" });
    } else {
      console.log({ message: "Entry deleted" });
      res.json({ message: "Entry deleted" });
    }
  });
});


// Gets a list of all users
router.get("/users", (req, res, next) => {
  let sqlquery = "SELECT * FROM users";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(result);
  });
});

// Gets a users by id
router.get("/users/:id", (req, res, next) => {
  const userId = req.params.id;
  let sqlquery = "SELECT * FROM users WHERE user_id = ?";
  db.query(sqlquery, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    } else if (result.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result[0]);
  });
});

// Deletes a user by ID
router.delete("/users/:id", (req, res, next) => {
  const userId = req.params.id;
  let sqldelete = "DELETE FROM users WHERE user_id = ?";
  db.query(sqldelete, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Not found" });
    } else {
      console.log({ message: "Entry deleted" });
      res.json({ message: "Entry deleted" });
    }
  });
});
module.exports = router;
