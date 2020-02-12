var express = require("express");
var siteRouter = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect("/login");
}

/* 
function isAdmin(req, res, next) {
  if (req.session.currentUser.admin) next();
  else res.redirect("/login");
}

siteRouter.get("/dashboard", isLoggedIn, isAdmin,  (req, res) => {
  res.render("main");
}); 
*/

siteRouter.get("/main", isLoggedIn, (req, res) => {
  res.render("main");
});

siteRouter.get("/private", isLoggedIn, (req, res) => {
  res.render("private");
});

module.exports = siteRouter;
