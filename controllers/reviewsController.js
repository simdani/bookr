const mongoose = require('mongoose');
require('../models/Review');
const Review = mongoose.model('reviews');

exports.index = (req, res) => {
  Review.find({status: 'public'})
    .populate('user')
    .sort({date: 'desc'})
    .then(reviews => {
      res.render('reviews/index', {
        reviews: reviews
      });
    });
};

// display add view
exports.addReview = (req, res) => {
  res.render('reviews/add');
};

// create new review (POST)
exports.postReview = (req, res) => {
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
};

// show review
exports.showReview = (req, res) => {
  Review.findOne({
    _id: req.params.id
  })
    .populate('user')
    .then(review => {
      res.render('reviews/show', {
        review
      });
    })
    .catch(err => { throw err; });
};
