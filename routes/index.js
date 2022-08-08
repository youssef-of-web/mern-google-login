const express = require("express");
const Router = express.Router();
const passport = require("passport");
Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req);
    res.redirect(
      `http://localhost:3000?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}`
    );
  }
);

module.exports = Router;
