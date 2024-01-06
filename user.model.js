const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema); // in collection this will going to show as 'users'

module.exports = User;