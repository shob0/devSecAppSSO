const jwt = require('jsonwebtoken');
const oauth2Client = require('./oauthService').oauth2Client;
const CONFIG = require('../config/appConfig');

function authenticate(req, res) {
    const loginLink = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: CONFIG.oauth2Credentials.scopes
    });
    res.render('index', {loginLink: loginLink});
}

function callback(req, res) {
    if(req.query.error) {
        return res.redirect('/authenticate');
    } else {
        oauth2Client.getToken(req.query.code, function(err, token) {
            if(err) {
                return res.redirect('/authenticate');
            } else {
                let jwtSession = jwt.sign(token, CONFIG.JWTsecret);
                req.session.jwt = jwtSession;
                //this will be the customer's local Identity
                req.session.email = jwt.decode(token.id_token).email;
                req.session.save((err)=>{
                    res.redirect('/protected');
                });
            }

        })
    }
}

function homepage (req, res) {
    res.render('protected');
}

module.exports = {
    authenticate,
    callback,
    homepage
}