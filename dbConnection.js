const mongoose = require('mongoose');
const { User } = require("./user.model");


function connectMongoDB() {
    console.log("connecting to database");
    mongoose.connect('mongodb://127.0.0.1:27017/usersdb')  // dont use localhost name instead use number 127.0.0.1
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log("database connection failed with error: ", err);
    });
}

exports.connectMongoDB = connectMongoDB;
