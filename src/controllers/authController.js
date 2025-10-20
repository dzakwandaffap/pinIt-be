const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { success, error, notFound } = require('../utils/responseHelper');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return notFound(res, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return error(res, 'Invalid credentials', 400);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return success(res, { token }, 'Login successful');
  } catch (err) {
    return error(res, err.message);
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  return success(res, null, 'Logout successful');
};
    
module.exports = {
    login,
    logout
}
