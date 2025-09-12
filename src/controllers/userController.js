const User = require('../models/userModel');
// const Counter = require('../models/counterModel');

// const getLatestId = async (req, res) => {
//     try {
//         const user = await User.findOne().sort({ id: 1 });
//         if (!user) {
//             return res.status(404).json({ message: 'No users found' });
//         }
//         res.status(200).json({ id: user.id });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const createUser = async (req, res) => {
    try {
        const { username, name, email, password} = req.body; 
        const newUser = new User({ username, name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllUsers = async ( req ,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

const getUserById = async (req, res) => { 
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'no users at all' });
        }
        res.status(200).json(user);
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, name, email, password },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    // getLatestId
}

 
