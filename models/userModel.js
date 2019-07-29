const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An user must have a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'An user must have an email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: [true, 'An user must have a password'],
    trim: true,
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'An user must have a confirm password'],
    trim: true,
    validate: {
      validator: function(value) {
        return this.password === value;
      },
      message: "Password and confirm password doesn't match"
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
