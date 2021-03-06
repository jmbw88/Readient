require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const logger = require("morgan");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

app.use(
  session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Logs req.session for debugging purposes
app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", 
{
  useCreateIndex: true,
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
