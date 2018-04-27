const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema
const UserSchema = new Schema({
  name: {
    type: String,
    requierd: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('users', UserSchema);
