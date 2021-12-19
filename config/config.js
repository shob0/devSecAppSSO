const jwt = require('jsonwebtoken');
const appConfig = require('./appConfig');

function decodeJWT(token) {
    var decoded = jwt.decode(token);
    return decoded;
}

module.exports = {
    decodeJWT
}