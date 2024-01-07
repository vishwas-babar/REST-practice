const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Log = mongoose.model('Log', LogSchema); // in collection this will going to show as 'logs'

module.exports = Log;