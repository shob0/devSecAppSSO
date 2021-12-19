const google = require('googleapis').google;
const CONFIG = require('../config/appConfig');
const Oauth2 = google.auth.OAuth2;

const oauth2Client = new Oauth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
);

module.exports = {
    oauth2Client
}