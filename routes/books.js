const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

// Load book model
require('../models/Book');
const Book = mongoose.model('books');

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('books/add');
});

// todo: complete pagination
router.get('/:page?', ensureAuthenticated, (req, res, next) => {
  let perPage = 9;
  let page = (parseInt(req.params.page)) || 1;

  Book.find({user: req.user.id})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({date: 'desc'})
    .then(books => {
      Book.count()
        .then(count => {
          res.render('books/index', {
            books: books,
            current: page,
            pages: Math.ceil(count / perPage)
          });
        })
        .catch(err => { throw err; });
    })
    .catch(err => { throw err; });
});

// add new book
router.post('/', ensureAuthenticated, (req, res) => {
  console.log(req.body);
  let errors = [];

  if (!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if (!req.body.author) {
    errors.push({text: 'Please add an author'});
  }
  if (!req.body.details) {
    errors.push({text: 'Please add book description'});
  }

  if (errors.length > 0) {
    res.render('/add', {
      errors: errors,
      title: req.body.title,
      author: req.body.author,
      details: req.body.details
    });
  } else {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      details: req.body.details,
      user: req.user.id
    };
    new Book(newBook)
      .save()
      .then(Book => {
        req.flash('success_msg', 'New book added');
        res.redirect('/books');
      });
  }
});

module.exports = router;
