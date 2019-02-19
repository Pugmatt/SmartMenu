var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const pg = require('pg');

var products = require('./routes/products');
var restaurants = require('./routes/restaurants');
var restaurantPicture = require('./routes/restaurant-picture');

var config = require('./config');

var database = require('./database');

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

    // Create development example database items
    if(!config.inprod) {
        database.Restaurant.findOne({
            where: {
                name: "Five Guys"
            }
        }).then(function (obj) {
            if (!obj) {
                console.log("Creating example database items");
                database.Restaurant.build({name: "McDonalds", id: "adaj327"}).save();
                database.Restaurant.build({name: "Taco Bell", id: "adae32d"}).save();
                database.Restaurant.build({name: "Five Guys", id: "ej73fe"}).save();
            }
        });
    }
};
// If in dev mode, create a database if needed. If in production, expect one to already be made
if(!config.inprod) {
    const client = new pg.Client('postgres://' + config.database.user + ':' + config.database.password + '@' + config.database.host + '/postgres');
    client.connect();
    client.query('CREATE DATABASE smartmenu', function (err) {
        db();
        client.end();
    });
}
else
    db();

// Setup api routes
app.use('/api/products', products);
app.use('/api/restaurants', restaurants);
app.use('/api/images/restaurant/', restaurantPicture);

module.exports = app;
