const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    } = require('../controllers/userController');
const verifyToken = require('../../middleware/auth');


// User routes
router.route('/', verifyToken).get(getAllUsers).post(createUser);


router.route('/:id', verifyToken)
    .get(getUserById)
    .put(updateUser);
    
router.route('/:id', verifyToken).delete(deleteUser);

module.exports = router;