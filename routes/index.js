var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', isNotLoggedin, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/register", isNotLoggedin, (req, res)=>{
  res.render("register");
})

router.post("/register", (req, res)=>{
  const {email, username, password} = req.body;
  const data = new userModel({
    email,
    username
  })

  userModel.register(data, password)
  .then(()=>{
    passport.authenticate("local")(req, res, ()=>{
      res.redirect("/profile");
    })
  })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), (req, res)=>{})

router.get("/logout", isLoggedin, (req, res, next)=>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

router.get("/profile", isLoggedin, (req, res)=>{
  res.render("profile");
})

function isLoggedin(req, res, next){
  if(req.isAuthenticated()) {return next()}
  return res.redirect("/")
}

function isNotLoggedin(req, res, next) {
  if(!req.isAuthenticated()) {return next()}
  return res.redirect("/profile")
}

module.exports = router;
