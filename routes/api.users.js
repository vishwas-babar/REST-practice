const express = require('express');

const router = express.Router();

// get the user model
const User = require('../models/user.model.js');

router.get('/test', (req, res) => {
    res.json({ message: 'hello from users route' });
});

router.route('/')
    .get(async (req, res) => {
        res.setHeader('X-Info', 'this is list of users'); // custom header
        // it is good practice to always use X- in the custom header nam


        const allUsers = await User.find({});
        res.json(allUsers);
    })
    .post((req, res) => {
        // create new user
        const body = req.body;

        console.log(body);

        // create new user in mongodb
        User.create({
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
            })
            .catch((err) => {
                console.log('error in creating user:', err);
                res.status(500); // 500 means internal server error
                res.json({ status: 'failed', message: err });
            });
    });


// this is dynamic path parameter
// if we have more than two request method with the same path then we can use the app.route() method
router.route('/:id')
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
                res.json({ status: 'success' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 'failed', message: error });
        }
    });

module.exports = router;