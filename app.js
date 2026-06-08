const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
require('dotenv').config();

const app = express();

app
    .use(express.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
        );
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        next()
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({origin: '*'}))
    .use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        // console.log(profile);
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out") });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

module.exports = app;