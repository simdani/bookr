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
    .populate('comments.commentUser')
    .then(review => {
      res.render('reviews/show', {
        review
      });
    })
    .catch(err => { throw err; });
};

// add commment to review
exports.addCommentToReview = (req, res) => {
  Review.findOne({
    _id: req.params.id
  })
    .then(review => {
      if (!req.body.comment) {
        res.render(`/reviews/show/${review.id}`);
      } else {
        // add new comment
        const comment = {
          commentBody: req.body.comment,
          commentUser: req.user.id
        };
        review.comments.push(comment);
        review.save()
          .then(review => {
            req.flash('success_msg', 'Comment created successfully.');
            res.redirect(`/reviews/show/${review.id}`);
          })
          .catch(err => { throw err; });
      }
    });
};
