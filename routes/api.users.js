const express = require('express');

const router = express.Router();

const {
    handleGetAllUsers,
    handlePostUser,
    handleGetUserById,
    handleEditUserById,
    handleDeleteUserById
} = require('../controllers/api.users.js');

router.get('/test', (req, res) => {
    res.json({ message: 'hello from users route' });
});

router.route('/')
    .get(handleGetAllUsers)
    .post(handlePostUser);

// this is dynamic path parameter
// if we have more than two request method with the same path then we can use the app.route() method
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleEditUserById)
    .delete(handleDeleteUserById);

module.exports = router;