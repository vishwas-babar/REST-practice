

const Log = require('../models/log.model.js');

function logRequest(req, res, next) {
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
            res.json({ status: 'failed', message: err, discription: 'error in creating log' });
        });
}

module.exports = logRequest;