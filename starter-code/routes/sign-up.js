var express = require("express");
var signupRouter = express.Router();
const User = require("./../models/User");

// BCRYPT
const bcrypt = require("bcrypt");
const saltRounds = 10;

//  GET    /signup
signupRouter.get("/", (req, res) => {
  res.render("sign-up");
});

// POST   /signup
signupRouter.post("/", (req, res) => {
  const { password, username } = req.body;

  if (username === "" || password === "") {
    res.render("sign-up", {
      errorMessage: "Username and password are required"
    });
    return;
  }

  User.findOne({ username })
    .then(userFound => {
      if (userFound) {
        res.render("sign-up", { errorMessage: "Username is already in use." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const pr = User.create({ username, password: hashedPassword });
      return pr;
    })
    .then(createdUser => {
      req.session.currentUser = createdUser;
      res.redirect("/");
    })
    .catch(() => {
      res.render("sign-up", {
        errorMessage: "Error during sign up. Try again."
      });
    });
});

module.exports = signupRouter;
