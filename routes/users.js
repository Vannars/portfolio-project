// ====================================================REQUIREMENTS====================================================
// Create a new router
const express =require("express");
const router =express.Router();
const bcrypt =require("bcrypt");
const { redirectLogin} =require("./redirectlogin"); //a cheeky redirectLogin function from the imported redirectlogin.js file
const { check, validationResult } =require("express-validator");
//==================================================LOGIN AND REGISTER ROUTES==================================================
router.get("/register", function (req, res, next) {
 
  res.render("register.ejs");
});

// New route to handle login
router.get("/login", function ( req, res, next){
  // Render the login.ejs view
  res.render("login.ejs");
});

// router to handle post request for login
router.post(
  "/loggedin",
  check("username" ).isAlphanumeric().trim().escape(), // check the username is alphanumeric - example of express-validator
  check("password").isLength({ min: 8 }).trim().escape(), // min password length is 8 - example of express-validator
  function (req, res, next) {
    const errors = validationResult(req); // does it meet the requirements above?
    if (!errors.isEmpty()) {
      res.redirect("./login"); // if not, redirect the user to the login pae
    } else {
      // Query the database to get the hashed password from the users table
      let sqlquery="SELECT hashedPassword FROM users WHERE username = ?";
      const sanitizedUsername=req.sanitize(req.body.username);
      // Execute the SQL query taking the username from the request body
      db.query(sqlquery, [sanitizedUsername], function (err, result) 
      {
        // Simple error handling
        if (err) return next(err);
        // If results =0 the user is not found
        if (result.length == 0) {
          res.send("user not found");
        } else {
          // use bcrypt taking the body password and the password from the result (index 0) from the query
          bcrypt.compare(
            req.body.password,
            result[0].hashedPassword,
            function (err, result) {
              // conditional output based on the result of the comparison
              if (err) {
                res.send("Login failed");
              } else if (result) {
                req.session.userId = sanitizedUsername;
                req.session.username = sanitizedUsername;
                res.redirect("/");
              } else {
                res.send("Login failed");
              }
            }
          );
        }
      });
    }
  }
);

// router to handle logout
router.get("/logout",redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("./");
    }
    res.send('you are now logged out. <a href="/">Home</a>');
  });
});

// router to handle users
router.get("/list", function (req, res, next) {
  let sqlquery = "SELECT * FROM users"; // query database to get all the users
  // execute sql query
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("userlist.ejs", { availableUsers: result });
  });
});
// check: email is an email, password has at least 8 characters, first and last name a-z/A-Z, username is alphanumeric a-z/A-Z/0-9
// errors cause a redirect to the register page
router.post(
  "/registered",
  [
    check("email" ).isEmail(), // example of express-validator
    check("password").isLength({ min: 8 }),
  ],

  function (req, res, next) {
    const errors = validationResult(req); // again does it meet the requirments?
    if (!errors.isEmpty()) {
      res.redirect("./register"); // if not redirect to the register page
    } else {
      const saltRounds = 10;
      // constants to sanitize the input
      const plainPassword =req.body.password;
      const sanitizedFirst =req.sanitize(req.body.first);
      const sanitizedLast =req.sanitize(req.body.last);
      const sanitizedEmail =req.sanitize(req.body.email);
      const sanitizedUsername= req.sanitize(req.body.username);

      // Hash the password
      bcrypt.hash(plainPassword,saltRounds, function (err, hashedPassword) {
        // example of bcrypt hashing - for security section  - portfolio
        if (err) {
          console.error(err);
          return next(err);
        }
        console.log("Hashed Password:", hashedPassword);
        // Store hashed password in the database.
        let sqlquery =
          "INSERT INTO users (username, firstname, lastname, email, hashedPassword) VALUES (?,?,?,?,?)";
        // Execute SQL query
        db.query(
          sqlquery,
          [
            sanitizedUsername,
            sanitizedFirst,
            sanitizedLast,
            sanitizedEmail,
            hashedPassword,
          ],
          function (err, result) {
            if (err) return next(err);
            console.log("1 record inserted" );
            // Send a response
            result =
              "Hello, these details are for demonstration purposes:" +
              sanitizedFirst +
              " " +
              sanitizedLast +
              " you are now registered!" + " Your email is: " +
              sanitizedEmail + " You username is: " + sanitizedUsername +" ";
            result +=
              " Your password is: " +
              req.body.password +
              " and your hashed password is: " +
              hashedPassword;
            res.send('<a href="/">Click here to go to the Homepage</a>' + '<br>' + '<a href="/login">Click here to go to the Login page</a>' + '<br>' + result);
          }
        );
      });
    }
  }
);

module.exports = router;