// install our Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

//Configure our App

const app = express();
const port = process.env.PORT || 8080;

const db = require("./data/queries");
const cities = require("./routes/cities");
const auth = require("./auth/auth");
const { verifyToken, verifyUser } = require("./data/verification");
const userRouter = require('./data/queries');

app.use(cors());
app.use(bodyParser.json());
// tells our application to use the body-parser middle ware and parse all incoming
// request body as of type Json

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

app.get("/", verifyToken, (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use("/cities", cities);
app.use("/auth", auth);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// Error Handler
// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render("error");

  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});
