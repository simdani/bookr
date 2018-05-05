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

// get individual book
router.get('/show/:id', ensureAuthenticated, booksController.showBook);

// delete book
router.delete('/:id', ensureAuthenticated, booksController.deleteBook);

module.exports = router;
