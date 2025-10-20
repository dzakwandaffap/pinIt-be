// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Optional profile fields
  image: {
    type: String,
    default: null,
  },
  numberPhone: {
    type: String, // Ubah jadi String biar bisa simpan +62 dst
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: null,
  },
});

// Hash password sebelum simpan
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
