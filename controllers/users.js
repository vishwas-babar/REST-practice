const User = require('../models/user.model.js');

async function handleGetAllUsersInHtmlPage(req, res) {
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
}


module.exports = handleGetAllUsersInHtmlPage;