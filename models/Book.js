const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create book Schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  currentPage: {
    type: Number,
    required: true,
    default: 0
  },
  pages: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'not started'
  },
  notes: [{
    note: {
      type: String,
      required: true
    },
    noteUser: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

mongoose.model('books', BookSchema, 'books');
