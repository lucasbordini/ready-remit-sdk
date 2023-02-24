var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var recipientListRouter = require('./routes/recipient-list');
var transferRouter = require('./routes/transfer');
var recipientRouter = require('./routes/recipient');
var bankRouter = require('./routes/bank');

var app = express();
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (!req.headers || !req.headers['authorization'] || req.headers['authorization'] != 'Bearer 06a3cc65-9700-4de0-8262-c1ea183daece') {
        console.log(req.headers);
        res.json({
                "code": "000",
                "message": "Something went wrong!",
                "description": "Unauthorized"
            });
    } else {
        next();
    }
})

app.use('/', indexRouter);
app.use('/', recipientListRouter);
app.use('/', transferRouter);
app.use('/', recipientRouter);
app.use('/', bankRouter);

module.exports = app;
