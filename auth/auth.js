const express = require("express");
const router = express.Router();

const pool = require("../data/postgres_connection");
const User = require("../db/user");

const bcrypt = require("bcrypt-nodejs");
const Jwt = require("jsonwebtoken");
const SECRET_KEY = 'asterix-needs-permit-a-38'; // NOT PERMITABLE FOR A REAL WORLD APPLICATION USE A .DOTENV FILE INSTEAD

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Auth Route"
  });
});

function validUser(user) {
  if (!user) {
    return false;
  }
  const username =
    typeof user.username == "string" && user.username.trim() != "";
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" &&
    user.password.trim() != "" &&
    user.password.trim().length >= 6;

  return username && validEmail && validPassword;
}

router.post("/signup", (req, res, next) => {
  if (validUser(req.body)) {
    User.getUserByEmail(req.body.email).then(user => {
      // if user is not found
      if (!user) {
        // ensure that this is a unique email
        // hash password
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
          // Store hash in your password DB.
          const user = {
            username: req.body.username,
            email: req.body.email,
            password: hash
          };
          User.create(user).then(id => {
            res.json({
              message: "User Successfully created",
              id: id
            });
          });
        });
      } else {
        // Email is in use
        res.json({
          message: "Email is in use"
        });
        console.log(`found the user with the exact email  ` + user);
      }
    });
  } else {
    res.json({
      message: "Invalid user"
    });
  }
});

router.post("/login", (req, res) => {
  if (validUser(req.body)) {
    // check to see if the user exists in the Db
    User.getUserByEmail(req.body.email).then(user => {
      if (!user) {
        res.json({
          message: "User Dosent exist"
        });
      } else {
        // compare password with hash password
        // Load hash from your password DB.
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          // res == true/ if the hashed password from the Db matches with the password that the user
          // provided
          if (result) {
            // set the cookie in the header for that logged in user
            res.cookie("user_id", user.id);
            // Generate a Jwt token for that user to be used for subsequent requests
            const token = Jwt.sign({user: user}, SECRET_KEY, {expiresIn: 3600000});
            res.json({
              ok: true,
              user: user,
              token: token
            });
          } else {
            res.json({ message: "password is incorrect" });
          }
        });
      }
    });
  } else {
    // information provided is not correct send the client back an error
    res.json({
      message: "Invalid Credentials"
    });
  }
});

//forgot password route 


router.get('/logout', (req, res) => {
  res.status.send({
    auth:false,
    token: null
  })

})

module.exports = router;
