const mongoose = require('mongoose');

// Load book model
require('../models/Book');
const Book = mongoose.model('books');

// show individual book
exports.showBook = (req, res) => {
  Book.findOne({
    _id: req.params.id
  })
    .then(book => {
      if (parseInt(book.user) !== parseInt(req.user.id)) {
        req.flash('error_msg', 'Not authorized to view this.');
        res.redirect('/books');
      } else {
        res.render('books/show', {
          book: book
        });
      }
    })
    .catch(err => { throw err; });
};

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
  let errors = [];

  if (!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if (!req.body.author) {
    errors.push({text: 'Please add an author'});
  }
  if (!req.body.details) {
    errors.push({text: 'Please add book details'});
  }
  if (!req.body.pages) {
    errors.push({text: 'Please add book pages'});
  }

  if (errors.length > 0) {
    res.render('/add', {
      errors: errors,
      title: req.body.title,
      author: req.body.author,
      details: req.body.details,
      pages: req.body.pages
    });
  } else {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
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

// delete book from user
exports.deleteBook = (req, res) => {
  console.log(req.user.id);

  Book.findOne({
    _id: req.params.id
  })
    .then((book) => {
      if (parseInt(book.user) !== parseInt(req.user.id)) {
        req.flash('error_msg', 'Not authorized to delete this.');
        res.redirect('/books');
      } else {
        Book.remove({
          _id: book._id
        })
          .then(() => {
            req.flash('success_msg', 'Book removed succesfully.');
            res.redirect('/books');
          })
          .catch(err => { throw err; });
      }
    })
    .catch(err => { throw err; });
};

exports.editBook = (req, res) => {
  Book.findOne({
    _id: req.params.id
  })
    .then(book => {
      if (parseInt(book.user) !== parseInt(req.user.id)) {
        res.flash('error_msg', 'Not authorized to edit this book.');
        res.redirect('/books');
      } else {
        res.render('books/edit', {
          book: book
        });
      }
    })
    .catch(err => { throw err; });
};

exports.putEditBook = (req, res) => {
  Book.findOne({
    _id: req.params.id
  })
    .then(book => {
      if (parseInt(book.user) !== parseInt(req.user.id)) {
        res.flash('error_msg', 'Not authorized to edit this bok.');
        res.redirect('/books');
      } else {
        let errors = [];

        if (!req.body.title) {
          errors.push({text: 'Please add a title'});
        }
        if (!req.body.author) {
          errors.push({text: 'Please add an author'});
        }
        if (!req.body.details) {
          errors.push({text: 'Please add book details'});
        }
        if (!req.body.pages) {
          errors.push({text: 'Please add book pages'});
        }

        if (errors.length > 0) {
          res.render('/edit', {
            errors: errors,
            title: req.body.title,
            author: req.body.author,
            details: req.body.details,
            pages: req.body.pages
          });
        } else {
          book.title = req.body.title;
          book.details = req.body.details;
          book.author = req.body.author;
          book.pages = req.body.pages;

          book.save()
            .then(book => {
              req.flash('success_msg', 'Book updated successfully.');
              res.redirect('/books');
            })
            .catch(err => { throw err; });
        }
      }
    })
    .catch(err => { throw err; });
};
