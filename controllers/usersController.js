const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');

// Load user model
require('../models/User');
const User = mongoose.model('users');

// user login form
exports.getLogin = (req, res) => {
  res.render('users/login');
};

// post login method
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};

exports.postRegister = (req, res) => {
  let errors = [];

  if (req.body.password !== req.body.password2) {
    errors.push({text: 'Passwords do not match'});
  }
  if (req.body.password.length < 4) {
    errors.push({text: 'Password must be at least 4 characters'});
  }
  if (errors.length > 0) {
    res.render('home', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email}).then(user => {
      if (user) {
        req.flash('error_msg', 'User exists with this email already');
        res.redirect('/');
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        // Encrypt password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            }).catch(err => {
              console.log(err);
            });
          });
        });
      }
    });
  }
};

// show user profile
exports.showUserProfile = (req, res) => {
  User.findOne({
    _id: req.params.id
  })
    .then(user => {
      res.render('users/show', {
        user
      });
    });
};

exports.logoutUser = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
};
