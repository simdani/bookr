const mongoose = require('mongoose');

// Load book model
require('../models/Book');
const Book = mongoose.model('books');

// add book controller get
exports.addBook = (req, res) => {
  res.render('books/add');
};

// get index books
exports.index = (req, res, next) => {
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
};

// create new book post
exports.postBook = (req, res) => {
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
};
