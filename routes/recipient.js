var sendJSON = require('./send_json');
var express = require('express');
var router = express.Router();

router.delete('/recipients/:id', (req, res, next) => {
    res.send().status(200)
});

router.post('/recipients/', (req, res, next) => {
    let name = ""
    let last = ""
    for (var i = 0; i < req.body.fields.length; i++) {
        if (req.body.fields[i].id == "FIRST_NAME") {
            name = req.body.fields[i].value;
        } else if (req.body.fields[i].id == "LAST_NAME") {
            last = req.body.fields[i].value;
        }
    }
    res.send(
        {
            "recipientId": "bdcbf71b-2e81-45f2-bc3c-e422b77c5c18",
            "senderId": "f266d036-695c-4686-958b-510c8e50f8f0",
            "recipientType": "PERSON",
            "firstName": name,
            "lastName": last,
            "fields": req.body.fields
        }
    )
});

router.put('/recipients/:id', (req, res, next) => {
    let name = ""
    let last = ""
    for (var i = 0; i < req.body.fields.length; i++) {
        if (req.body.fields[i].id == "FIRST_NAME") {
            name = req.body.fields[i].value;
        } else if (req.body.fields[i].id == "LAST_NAME") {
            last = req.body.fields[i].value;
        }
    }
    res.send(
        {
            "recipientId": "bdcbf71b-2e81-45f2-bc3c-e422b77c5c18",
            "senderId": "f266d036-695c-4686-958b-510c8e50f8f0",
            "recipientType": "PERSON",
            "firstName": name,
            "lastName": last,
            "fields": req.body.fields
        }
    )
});


module.exports = router;