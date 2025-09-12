const mongoose = require('mongoose');
// const Counter = require('./counterModel');

const userSchema = new mongoose.Schema({
    //  id: {
    //     type: Number,
    //     unique: true
    // },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// userSchema.pre('save', async function (next) {
//     const doc = this;
//     if (doc.isNew) {
//         const counter = await Counter.findByIdAndUpdate(
//             { id: 'userId' },
//             { $inc: { sequence_value: 1 } },
//             { new: true, upsert: true }
//         );
//         doc.id = counter.sequence_value;
//     }
//     next();
// });


const User = mongoose.model('User', userSchema);

module.exports = User; 