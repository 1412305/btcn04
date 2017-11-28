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
  res.render('index', {user: user});
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
    res.render('account', { action: 'Register', error: errors[0].msg, isRegister: true, actionLink: '/register' });
    return;
  }
  else{
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      console.log(err);
     if (err) {
        return res.render('account', {action: 'Register', error: 'Email already taken!', isRegister: true, actionLink: '/register' });
      }
      var wallet = new Wallet();
      wallet.accountId = account._id;
      wallet.save(function(err, wallet){
        if (err)
          return;
      })
      res.redirect('/' );
     });
    }
});


router.post('/login', function(req, res) {
  passport.authenticate('local', function(err, account, info) {
    if (err) 
      res.status(500);
    if (!account) { return res.render('account', {title: 'Login', error: info.message, isRegister: false, actionLink: '/login'}); }
    req.logIn(account, function(err) {
      if (err) {       res.status(500); }
      return res.redirect('/');
        });
    })(req, res);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
  

module.exports = router;
