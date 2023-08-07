const mongoose = require('mongoose');
const { isEmail, isStrongPassword } = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [isStrongPassword, 'Password must have 8 characters, 1 number, 1 lowercase, 1 uppercase and 1 symbol'],
  },
  role: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
