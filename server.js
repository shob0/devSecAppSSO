const express = require('express');
const session  = require('express-session');
const bodyParser = require("body-parser");
const restService = require('./service/restService');
const CONFIG = require('./config/appConfig');
const { decodeJWT } = require('./config/config');

var app = express(),
path = require('path'),
publicDir = path.join(__dirname,'public');

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 600000,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'prod'
    },
    secret: 'SESSION_SECRET'
}));

app.set('view engine', 'html');
app.set('views', publicDir);


app.set('views' , publicDir);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/protected', sessionValidation, restService.homepage);

app.get('/', restService.authenticate);
app.get('/callback', restService.callback);

app.use(express.static(publicDir));

app.get('/ping', (req, res)=> {
    console.log(req.session)
    req.session.userId = 'test';
    res.send('pinging');
    
});

app.listen(CONFIG.port, 'localhost', (req, res)=>{
    console.log(`server running on port ${CONFIG.port}`);
});

function sessionValidation(req, res, next) {
    console.debug('Authentication check.');
    if(!req.session.jwt){
        console.debug('redirecting to login');
        res.redirect('/');
    } else {
        console.log('user is already authenticated');
        next();
    }
}
module.exports = app;
