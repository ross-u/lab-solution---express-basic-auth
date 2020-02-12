var express = require("express");
var router = express.Router();

const signupRouter = require("./sign-up");
const loginRouter = require("./log-in");

router.use("/signup", signupRouter);
router.use("/login", loginRouter);

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      // If unable to logout the user
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
