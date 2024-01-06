const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
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
            unique: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        jobTitle: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;