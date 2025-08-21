const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true 
  }, 
  password: {
    type: String,
    required: true, 
  }
});

// Static signup method
userSchema.statics.signup = async function (name, email, password) {
  const normalizedEmail = email.toLowerCase();

  if (!normalizedEmail || !password || !name) { 
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(normalizedEmail)) {
    throw Error('Please provide a valid email');
  }

  const emailExists = await this.findOne({ email: normalizedEmail });
  if (emailExists) {
    throw Error('Email is already in use');
  }

  if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 0 })) {
    throw Error('Please provide a stronger password (min 8 chars, mix of letters & numbers).');
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await this.create({ name, email: normalizedEmail, password: hash });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw Error('An error occurred while creating the user. Please try again.');
  }
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled'); 
  }

  const normalizedEmail = email.toLowerCase();
  const user = await this.findOne({ email: normalizedEmail });

  if (!user) {
    throw Error('Invalid email or password');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {  
    throw Error('Invalid email or password');
  }

  // Return user with name and email
  return user;
};

module.exports = mongoose.model('User', userSchema);
