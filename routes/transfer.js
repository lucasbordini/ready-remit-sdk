var sendJSON = require('./send_json');
var express = require('express');
var router = express.Router();

router.get("/countries", (req, res, next) => {
    sendJSON('countries', res);
});

router.get('/corridors', (req, res, next) => {
    if (req.query.dstCountryIso3Code.toLowerCase() == "usa") {
        sendJSON('corridor-usa', res);
    } else {
        sendJSON('corridor-gbr', res);
    }
});

router.get('/transfer-fields', (req, res, next) => {
    if (req.query.transferMethod == "BANK_ACCOUNT") {
        sendJSON('transfer-fields-bank-transfer', res);
    } else if (req.query.transferMethod == "CASH_PICKUP") {
        sendJSON('transfer-fields-cash-pickup', res);
    } else {
        sendJSON('transfer-fields-push-to-card', res);
    }
});

router.get('/recipient-fields', (req, res, next) => {
    if (req.query.transferMethod == "BANK_ACCOUNT") {
        sendJSON('recipient-fields-bank-transfer', res);
    } else if (req.query.transferMethod == "CASH_PICKUP") {
        sendJSON('recipient-fields-cash-pickup', res);
    } else {
        sendJSON('recipient-fields-push-to-card', res);
    }
});

router.get('/quote', (req, res, next) => {
    let receive = parseInt(req.query.amount)
    let currency = "US Dollar"
    let rate = 1
    let fee = 360
    if (req.query.dstCountryIso3Code != "USA") { 
        receive = receive * 2 
        currency = "Euro"
        rate = 2
        fee = 830
    }
    res.json(
        {
            "sendAmount": {
                "value": parseInt(req.query.amount),
                "currency": {
                    "name": "US Dollar",
                    "iso3Code": "USD",
                    "symbol": "$",
                    "decimalPlaces": 2,
                    "roundDirection": "STANDARD"
                }
            },
            "receiveAmount": {
                "value": receive,
                "currency": {
                    "name": currency,
                    "iso3Code": req.query.dstCurrencyIso3Code,
                    "symbol": "$",
                    "decimalPlaces": 2,
                    "roundDirection": "STANDARD"
                }
            },
            "rate": parseInt(rate),
            "adjustments": [
                {
                    "label": "Transfer Fee",
                    "amount": {
                        "value": parseInt(fee),
                        "currency": {
                            "name": "US Dollar",
                            "iso3Code": "USD",
                            "symbol": "$",
                            "decimalPlaces": 2,
                            "roundDirection": "STANDARD"
                        }
                    }
                }
            ],
            "totalCost": {
                "value": parseInt(req.query.amount) + parseInt(fee),
                "currency": {
                    "name": "US Dollar",
                    "iso3Code": "USD",
                    "symbol": "$",
                    "decimalPlaces": 2,
                    "roundDirection": "STANDARD"
                }
            },
            "destinationCountryISO3Code": req.query.dstCountryIso3Code,
            "destinationCurrencyISO3Code": req.query.dstCurrencyIso3Code,
            "sourceCurrencyIso3Code": "USD",
            "transferMethod": req.query.transferMethod,
            "disclosures": [],
            "deliverySLA": {
                "id": "SAME_BUSINESS_DAY",
                "name": "Same Business Day"
            },
            "quoteHistoryId": "126cf054-4dad-4842-ae12-02dd76f27fea"
        }
    )
});


router.get('/transfers/:id', (req, res, next) => {
    sendJSON('transfer', res);
});



module.exports = router;