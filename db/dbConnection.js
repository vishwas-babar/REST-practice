const mongoose = require('mongoose');
const { User } = require("../models/user.model");


function connectMongoDB() {
    console.log("connecting to database");
    mongoose.connect('mongodb://127.0.0.1:27017/usersdb')  // dont use localhost name instead use number 127.0.0.1
    .then(() => {
        console.log(`mongodb connected!! db host: ${mongoose.connection.host}, db port: ${mongoose.connection.port}, db name: ${mongoose.connection.name}`);
    })
    .catch((err) => {
        console.log("database connection failed with error: ", err);
        process.exit(1); // exit the process with error code 1 - this will going to stop the server
    });
}

exports.connectMongoDB = connectMongoDB;
