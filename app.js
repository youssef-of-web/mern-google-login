const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
const googleAuth = require("./routes/index");
const { Connect } = require("./config/connect");
const cors = require("cors");
const passport = require("passport");
const app = express();
//cors
app.use(cors());
//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
//dotenv
dotenv.config();
Connect();
//morgan
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./auth/google-auth")(passport);

app.use("/", googleAuth);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
