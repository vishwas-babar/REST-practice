
require('dotenv').config();
const express = require('express');
const users = require('./users_data.json');
const fs = require('fs');

const app = express();

// middleware - plugin
app.use(express.urlencoded({ extended: true })); // data comming from the client will be added to the req.body

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
        const body = req.body;
        let id = users.length + 1;
        body.id = id;
        id++;
        console.log(body);

        users.push(body);
        fs.writeFile('./users_data.json', JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                return;
            }else{
                console.log('New user added');
                res.json({status: 'success'});
            }
        });
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

        let id = Number(req.params.id);
        const body = req.body;
        let index = users.findIndex((user) => user.id === id);

        users[index] = {...users[index], ...body}; // merge the old data with the new data
        
        // write the updated data to the file
        fs.writeFile('./users_data.json', JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                res.json({status: 'failed to add updated data in database'});
                return;
            }else{
                console.log('User updated');
                res.json({status: 'success'});
            }
        });

    })
    .delete((req, res) => {
        // delete user with the given id in route parameter
        
        let id = Number(req.params.id);

        let index = users.findIndex((user) => user.id === id);
        console.log(index);
        users.splice(index, 1); // remove one element from the given index

        // write the updated data to the file
        fs.writeFile('./users_data.json', JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                res.json({status: 'failed to add update data in database'});
                return;
            }else{
                console.log('User deleted');
                res.json({status: 'success'});
            }
        });
    })



app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});