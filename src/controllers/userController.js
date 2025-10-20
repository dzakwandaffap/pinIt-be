const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { success, error, notFound } = require('../utils/responseHelper');

// Create user
const createUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // Validasi field wajib
    if (!username || !name || !email || !password) {
      return error(res, 'All fields are required', 400);
    }

    // Cek email sudah ada atau belum
    const existingUser = await User.findOne({ email });
    if (existingUser) return error(res, 'Email already registered', 400);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, name, email, password: hashedPassword });
    await newUser.save();

    return success(res, newUser, 'User created successfully', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    return success(res, users, 'User list retrieved successfully');
  } catch (err) {
    return error(res, err.message);
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return notFound(res, 'User not found');
    return success(res, user, 'User retrieved successfully');
  } catch (err) {
    return error(res, err.message);
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const updateData = { username, name, email };

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) return notFound(res, 'User not found');
    return success(res, user, 'User updated successfully');
  } catch (err) {
    return error(res, err.message);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return notFound(res, 'User not found');
    return success(res, null, 'User deleted successfully');
  } catch (err) {
    return error(res, err.message);
  }
};

// Get profile (for logged in user)
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await User.findById(userId).select('-password');

    if (!userProfile) {
      return notFound(res, 'User not found');
    }

    return success(res, userProfile, 'Profile retrieved successfully');
  } catch (err) {
    return error(res, err.message || 'Failed to fetch profile', 500);
  }
};

// Update profile (for logged in user)
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, name, email, password, bio, gender, numberPhone } = req.body;

    const updateData = { username, name, email, bio, gender, numberPhone };

    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, '/');

    }

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) return notFound(res, 'User not found');
    return success(res, updatedUser, 'Profile updated successfully');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
};
