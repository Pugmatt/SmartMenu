var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const pg = require('pg');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var SequelizeStore = require('connect-session-sequelize')(session.Store);

var products = require('./routes/products');
var restaurants = require('./routes/restaurants');
var user = require('./routes/user');
var pictures = require('./routes/images');

var config = require('./config');

var database = require('./database');

var fileRoutes = require('./routes/file'); //<--- this was added

// Setup web server

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Setup database
const db = async function() {
    await database.load();
    await database.connect();
    console.log("Loaded models");

    var seqSessions = new SequelizeStore({
        db: database.db
    });
    app.use(session({
        secret: 'dsj8w32djw1',
        store: seqSessions,
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true // if you do SSL outside of node.
    }));
    seqSessions.sync();

    app.use(passport.initialize());
    app.use(passport.session());

    // Setup passport strategy
    passport.use(new LocalStrategy({usernameField: "email"},
        function(username, password, done) {
            database.User.authenticate(username, password, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.index);
    });
    
    passport.deserializeUser(function(id, done) {
        database.User.findById(id, function (err, user) {
        done(err, user);
        });
    });

    // Setup api routes
    app.use('/api/products', products);
    app.use('/api/restaurants', restaurants);
    app.use('/api/images/', pictures);
    app.use('/api/user/', user);
    app.use('/api/file/', fileRoutes);

    // Create development example database items
    if(!config.inprod) {
        database.Restaurant.findOne({
            where: {
                name: "Five Guys"
            }
        }).then(function (obj) {
            if (!obj) {
                console.log("Creating example database items");
                database.Restaurant.build({name: "McDonalds", location: ""}).save();
                database.Restaurant.build({name: "Taco Bell"}).save();
                database.Restaurant.build({name: "Five Guys"}).save();
            }
        });
    }
};
// If in dev mode, create a database if needed. If in production, expect one to already be made
if(!config.inprod) {
    const client = new pg.Client('postgres://' + config.database.user + ':' + config.database.password + '@' + config.database.host + '/postgres');
    client.connect();
    client.query('CREATE DATABASE smartmenu', function () {
        db();
        client.end(); 
    });
}
else
    db();


module.exports = app;
