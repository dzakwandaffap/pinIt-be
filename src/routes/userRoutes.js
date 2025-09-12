const express = require('express');
const router = express.Router();
const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    // getLatestId 
} = require('../controllers/userController');


// User routes
router.route('/').get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser);
    
router.route('/:id').delete(deleteUser);

// router.route('/latest-id').get(getLatestId);

module.exports = router;