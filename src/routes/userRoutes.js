const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile
} = require('../controllers/userController');

// Profile route
router.get('/profile', verifyToken, getProfile);

// CRUD
router.route('/')
  .get(verifyToken, getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(verifyToken, getUserById)
  .put(updateUser)
  .delete(verifyToken, deleteUser);

module.exports = router;
