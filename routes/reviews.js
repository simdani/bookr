const express = require('express');
const router = express.Router();

// Load controlelrs
const reviewsController = require('../controllers/reviewsController');

// load method for checking if user is logged in
const { ensureAuthenticated } = require('../helpers/auth');

// /reviews/index main page
router.get('/', reviewsController.index);

// /reviews/add display add form
router.get('/add', ensureAuthenticated, reviewsController.addReview);

// /reviews/ post new review
router.post('/', ensureAuthenticated, reviewsController.postReview);

// show review
router.get('/show/:id', reviewsController.showReview);

module.exports = router;
