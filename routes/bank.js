var sendJSON = require('./send_json');
var express = require('express');
var router = express.Router();

router.post('/recipients/:id/accounts', (req, res, next) => {
    let id = req.params.id
    let account = ""
    for(var i = 0; i < req.body.fields.length; i++) {
        if (req.body.fields[i].id == "BANK_ACCOUNT_NUMBER") {
            account = req.body.fields[i].value
        }
    }
    res.send(
        {
            "dstCurrencyIso3Code": req.body.dstCurrencyIso3Code,
            "dstCountryIso3Code": req.body.dstCountryIso3Code,
            "transferMethod": "BANK_ACCOUNT",
            "recipientAccountId": id,
            "accountNumber": account,
            "fields": req.body.fields
        }
    )
});

router.put('/recipients/:id/accounts/:accid', (req, res, next) => {
    let id = req.params.id
    let account = ""
    for(var i = 0; i < req.body.fields.length; i++) {
        if (req.body.fields[i].id == "BANK_ACCOUNT_NUMBER") {
            account = req.body.fields[i].value
        }
    }
    res.send(
        {
            "dstCurrencyIso3Code": req.body.dstCurrencyIso3Code,
            "dstCountryIso3Code": req.body.dstCountryIso3Code,
            "transferMethod": "BANK_ACCOUNT",
            "recipientAccountId": id,
            "accountNumber": account,
            "fields": req.body.fields
        }
    )
});


router.get('/recipient-account-fields', (req, res, next) => {
    if (req.params.dstCountryIso3Code == "USA") {
        sendJSON('account-fields-usa', res);
    } else {
        sendJSON('account-fields-gbr', res);
    }
});

router.delete('/recipients/:id/accounts/:accid', (req, res, next) => {
    res.send().status(200)
});

module.exports = router;