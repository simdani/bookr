const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

// load book controller
const booksController = require('../controllers/booksController');

// show new book form
router.get('/add', ensureAuthenticated, booksController.addBook);

// todo: complete pagination
router.get('/:page?', ensureAuthenticated, booksController.index);

// add new book
router.post('/', ensureAuthenticated, booksController.postBook);

module.exports = router;
