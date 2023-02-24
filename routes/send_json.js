var fs = require("fs");

module.exports = function sendJSON(name, res) {
    fs.readFile(__dirname + '/json/' + name + '.json', 'utf8', (err, data) => res.send(data).status(200));
}
