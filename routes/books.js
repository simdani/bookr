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

// book edit form
router.get('/edit/:id', ensureAuthenticated, booksController.editBook);

// update book
router.put('/:id', ensureAuthenticated, booksController.putEditBook);

// add note to book
router.post('/:id/note', ensureAuthenticated, booksController.addNote);

// remove note from book
router.delete('/:id/notes/:note', ensureAuthenticated, booksController.removeNote);

module.exports = router;
