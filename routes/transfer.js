var sendJSON = require('./send_json');
var express = require('express');
var router = express.Router();

router.get("/countries", (req, res, next) => {
    sendJSON('countries', res);
});

router.get('/corridors', (req, res, next) => {
    if (req.query.dstCountryIso3Code.toLowerCase() == "usa") {
        sendJSON('corridor-usa', res);
    } else if (req.query.dstCountryIso3Code.toLowerCase() == "gbr") {
        sendJSON('corridor-gbr', res);
    } else if (req.query.dstCountryIso3Code.toLowerCase() == "mex") {
        sendJSON('corridor-mex', res);
    } else if (req.query.dstCountryIso3Code.toLowerCase() == "fra") {
        sendJSON('corridor-fra', res);
    } else if (req.query.dstCountryIso3Code.toLowerCase() == "jpn") {
        sendJSON('corridor-jpn', res);
    } else {
        sendJSON('corridor-bra', res);
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
    if (receive >= 10000) {
        res.json([
            {
                "code": "MaxLimitOutOfRange",
                "message": "Maximum allowable amount exceeded for this transaction.",
                "description": "Maximum allowable amount exceeded for this transaction."
            }
        ]);
    } else if (receive <= 1000) {
        res.json([
            {
                "code": "MinLimitOutOfRange",
                "message": "Minimum amount was not met for this transaction.",
                "description": "Minimum amount was not met for this transaction."
            }
        ]);
    }
    let currency = "US Dollar"
    let rate = 1
    let fee = 360
    if (req.query.dstCountryIso3Code == "GBR" || req.query.dstCountryIso3Code == "FRA") { 
        receive = receive * 2 
        currency = "Euro"
        rate = 2
        fee = 830
    } else if (req.query.dstCountryIso3Code == "MEX") {
        receive = receive * 0.14
        currency = "Mexican Nuevo Peso"
        rate = 0.14
        fee = 432
    } else if (req.query.dstCountryIso3Code == "JPN") {
        receive = receive * 0.07 
        currency = "Yen"
        rate = 0.07
        fee = 652
    } else if (req.query.dstCountryIso3Code == "BRA") {
        receive = receive * 0.04 
        currency = "Brazilian Real"
        rate = 0.04
        fee = 123
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
                "value": parseInt(receive),
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