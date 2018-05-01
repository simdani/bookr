const express = require('express');
const router = express.Router();

// Load controlelrs
const reviewController = require('../controllers/reviewController');

// load method for checking if user is logged in
const { ensureAuthenticated } = require('../helpers/auth');

// /reviews/index main page
router.get('/', reviewController.index);

// /reviews/add display add form
router.get('/add', ensureAuthenticated, reviewController.addReview);

// /reviews/ post new review
router.post('/', ensureAuthenticated, reviewController.postReview);

module.exports = router;
