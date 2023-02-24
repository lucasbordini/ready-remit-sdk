var sendJSON = require('./send_json');
var express = require('express');
var router = express.Router();


router.get('/recipients-with-accounts', function (req, res, next) {
  if (req.headers['empty'] == "true") {
    sendJSON('recipient-with-accounts-empty', res);
  } else {
    sendJSON('recipient-with-accounts', res);
  }
});

router.get('/senders/authenticated', function (req, res, next) {
  sendJSON('senders-auhtenticated', res)
});

module.exports = router;
