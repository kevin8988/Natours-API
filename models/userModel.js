const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
      //This only work on save and create!!
      validator: function(value) {
        return this.password === value;
      },
      message: "Password and confirm password doesn't match"
    }
  }
});

userSchema.pre('save', async function(next) {
  //Only run if password was modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete the password confirm field
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
