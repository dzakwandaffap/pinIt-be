const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { success, error, notFound } = require('../utils/responseHelper');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, 'Email and password are required', 400);
    }

    const user = await User.findOne({ email });
    if (!user) return notFound(res, 'User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return error(res, 'Invalid password', 401);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return success(res, { token, user }, 'Login successful');
  } catch (err) {
    return error(res, err.message);
  }
};

const logout = async (req, res) => {
  return success(res, null, 'Logout successful (client should delete token)');
};

module.exports = { login, logout };
