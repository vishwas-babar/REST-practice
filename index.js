
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { connectMongoDB } = require('./dbConnection');

// for connecting to mongodb
connectMongoDB();

// get the user model
const User = require('./user.model.js');
// get the log model
const Log = require('./log.model.js');


const app = express();
let id = 0;

// middleware - plugin
app.use(express.urlencoded({ extended: true })); // data comming from the client will be added to the req.body

// // middleware 1 - this will run for all the request
// app.use((req, res, next) => { // next is a callback function which will call the next middleware
//    console.log('hello from middleware 1');

//    console.log(req.method);
//    if (req.method === `POST`) {
//        res.send('POST method is not allowed here');
//    }else{
//         next(); // this will call the next middleware if we dont have next middleware then it will call the route handler
//    }

// });

// middleware 2
// this middleware is for logging the request in database
app.use((req, res, next) => { // next is a callback function which will call the next middleware
    console.log('hello from middleware 2');

    let now = new Date();
    let date = now.toISOString().split('T')[0]; // get date part
    let time = now.toISOString().split('T')[1].split('.')[0]; // get time part

    console.log(date); // prints date in YYYY-MM-DD format
    console.log(time); // prints time in HH:mm:ss format

    // create new log in mongodb
    Log.create({
        method: req.method,
        url: req.url,
        date: date,
        time: time,
    })
        .then((log) => {
            console.log('log created');
            console.log(log);
            next(); // this will call the next middleware if we dont have next middleware then it will call the route handler
        })
        .catch((err) => {
            console.log('error in creating log:', err);
            res.status(500); // 500 means internal server error
            res.json({ status: 'failed', message: err });
        });
});

// middleware for checking the request has all required data for post request
app.use((req, res, next) => {
    if (req.method === 'POST') {
        const body = req.body;
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ status: 'failed', message: 'all required data is not provided' });
        } else {
            next();
        }
    } else {
        next();
    }
});

// this will going to render all the users in the html file
app.get('/users', async (req, res) => {

    allUsers = await User.find({});

    const html = allUsers.map(user => {
        return `<div>
                    <h1>${user.id}. ${user.firstName} ${user.lastName}</h1>
                    <p>${user.gender}</p>
                    <p>${user.email}</p>
                    <p>${user.jobTitle}</p>
                </div>`;
    }).join('');

    res.send(html);
});


app.route('/api/users')
    .get(async (req, res) => {
        res.setHeader('X-Info', 'this is list of users'); // custom header
        // it is good practice to always use X- in the custom header nam
        
        
        const allUsers = await User.find({});
        res.json(allUsers);
    })
    .post((req, res) => {
        // create new user
        const body = req.body;

        body.id = id;
        console.log(body);

        // create new user in mongodb
        User.create({
            id: body.id,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
        })
            .then((user) => {
                console.log('user created');
                console.log(user);
                res.status(201); // 201 means created
                res.json({ status: 'success' });
                id++;
            })
            .catch((err) => {
                console.log('error in creating user:', err);
                res.status(500); // 500 means internal server error
                res.json({ status: 'failed', message: err });
            });
    })


// this is dynamic path parameter
// if we have more than two request method with the same path then we can use the app.route() method
app.route('/api/users/:id')
    .get(async (req, res) => {
        let id = req.params.id; // if i use the double equals then i no need to convert the id to number
        let user = await User.findById(id);

        if (!user) {
            res.status(404).send('User not found');
            return;
        } else {
            res.json(user);
        }
    })
    .patch(async (req, res) => {
        // edit user with the given id in route parameter

        let id = req.params.id;
        const body = req.body;
        let user = await User.findByIdAndUpdate(id, {
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
        });

        if (!user) {
            res.status(404).send('User not found');
            return;
        } else {
            res.json({ status: 'success' });
            console.log('User updated');
        }
    })
    .delete(async (req, res) => {
        // delete user with the given id in route parameter
        try {
            let id = req.params.id;
            let user = await User.findByIdAndDelete(id); // this will delete the user with the given id 
            if (!user) {
                res.status(404).send('User not found');
                return;
            } else {
                console.log('User deleted');
                res.json({ status: 'success' }).statusCode(200);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 'failed', message: error });
        }
    })


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});