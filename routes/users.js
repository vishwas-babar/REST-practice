const express = require('express');
const router = express.Router();

// get user and log model
const User = require('../models/user.model.js');
const Log = require('../models/log.model.js');

router.route('/')

// this will going to render all the users in the html file
router.route('/')
    .get(async (req, res) => {

        allUsers = await User.find({});

        const html = allUsers.map(user => {
            return `<div>
                    <h1>${user.firstName} ${user.lastName}</h1>
                    <p>${user.gender}</p>
                    <p>${user.email}</p>
                    <p>${user.jobTitle}</p>
                </div>`;
        }).join('');

        res.send(html);
    });


module.exports = router;