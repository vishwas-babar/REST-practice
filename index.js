
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// database connection
const { connectMongoDB } = require('./db/dbConnection.js');

// routes
const userRouter = require('./routes/api.users.js');
const htmlUserRouter = require('./routes/users.js');

// middleware functions
const logRequest = require('./middlewares/reqLogs.js');
const postHasRequiredData = require('./middlewares/postHasRequiredData.js');

// for connecting to mongodb
connectMongoDB();

const app = express();

// middleware - plugin
app.use(express.urlencoded({ extended: true })); // data comming from the client will be added to the req.body


// allowed cors
app.use(cors(
    {
        origin: process.env.ALLOWED_ORIGIN,
        optionsSuccessStatus: 200,
    }
));



// middleware 1
// this middleware is for logging the request in database
app.use(logRequest);

// middleware for checking the post request has all required data 
app.use(postHasRequiredData);

// routes for rendering all suers in html
app.use('/users', htmlUserRouter);
// routes for /api/users
app.use('/api/users', userRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});