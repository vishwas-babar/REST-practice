const express = require('express');
const handleGetAllUsersInHtmlPage = require('../controllers/users.js');
const router = express.Router();

router.route('/')

// this will going to render all the users in the html file
router.route('/')
    .get(handleGetAllUsersInHtmlPage);

module.exports = router;