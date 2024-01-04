
require('dotenv').config();
const express = require('express');
const users = require('./users_data.json');


// this function will return the user object if the user is found
// const getUserById = (id) => {
//     let is_user_found = false;
//     let found_user;

//     users.forEach(user => {
//         if (user.id == id){
//             is_user_found = true;
//             found_user = user;
//         }
//     });

//     if (is_user_found){
//         return found_user;
//     }else{
//         return false;
//     }
// };



const app = express();

app.get('/', (req, res) => {
    res.send('home page');
});

// this will going to render all the users in the html file
app.get('/users', (req, res) => {
    const html = users.map(user => {
        return `<div>
                    <h1>${user.id}. ${user.first_name} ${user.last_name}</h1>
                    <p>${user.gender}</p>
                    <p>${user.email}</p>
                    <p>${user.job_title}</p>
                </div>`;
    }).join('');

    res.send(html);
});


app.route('/api/users')
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res) => {
        // create new user
        return res.json({ status: 'pending' });
    })


// this is dynamic path parameter
// if we have more than two request method with the same path then we can use the app.route() method
app.route('/api/users/:id')
    .get((req, res) => {
        let id = Number(req.params.id); // if i use the double equals then i no need to convert the id to number
        let user = users.find((user) => user.id === id);

        if (!user) {
            res.status(404).send('User not found');
            return;
        } else {
            res.json(user);
        }
    })
    .patch((req, res) => {
        // edit user with the given id in route parameter
        return res.json({ status: 'pending' });
    })
    .delete((req, res) => {
        // delete user with the given id in route parameter
        return res.json({ status: 'pending' });
    })



app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});