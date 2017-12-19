var express = require('express');
var router = express.Router();
var Account = require('../models/account.js');
var passport = require('passport');
var Wallet = require('../api/models/wallet.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  var user = null;
  if (req.isAuthenticated()){
    user = req.user.username;
  }
  res.json(user);
});

router.get('/login', function(req, res, next) {
  res.render('account', {action: 'Login', isRegister: false, actionLink: '/login'});
});

router.get('/register', function(req, res, next) {
  res.render('account',  {action: 'Register', isRegister: true, actionLink: '/register'});
});
 

router.post('/register', function(req, res, next) {
  req.checkBody('username', 'Email cannot be empty').notEmpty();
  req.checkBody('password', 'Password cannot be empty').notEmpty();
  var errors = req.validationErrors();
 
  if (errors) {
    res.status(500);
  }
  else{
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
     
     if (err) {
        res.status(500);
      }
      var wallet = new Wallet();
      wallet.accountId = account._id;
      wallet.save(function(err, wallet){
        if (err)
        res.status(500);
      })
      res.status(200);
     });
    }
});


router.post('/login', function(req, res) {
  passport.authenticate('local', function(err, account, info) {
    if (err) 
      res.status(500);
    if (!account) { return;}
    req.logIn(account, function(err) {
      if (err) {       res.status(500); }
      return res.status(200);
        });
    })(req, res);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200);
});
  

module.exports = router;
