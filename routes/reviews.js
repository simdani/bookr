const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Review');
const Review = mongoose.model('reviews');

const { ensureAuthenticated } = require('../helpers/auth');

router.get('/', (req, res) => {
  Review.find({status: 'public'})
    .populate('user')
    .sort({date: 'desc'})
    .then(reviews => {
      res.render('reviews/index', {
        reviews: reviews
      });
    });
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('reviews/add');
});

router.post('/', ensureAuthenticated, (req, res) => {
  let allowComments;

  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  // create review from inputs
  const newReview = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  };

  // create review in database
  new Review(newReview)
    .save()
    .then(review => {
      res.redirect('reviews');
    });
});

module.exports = router;
