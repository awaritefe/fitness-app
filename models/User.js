const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: 7
    },
});

module.exports = mongoose.model('User', UserSchema);