var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const database = require("../database.js");

/* GET restaurant image */
router.get('/restaurant/:id', function(req, res, next) {
    if(req.params.id) {
        // Check if image file exists, if so send image file. If not, throw 404
        if(!fs.existsSync(path.join(__dirname, '../images/restaurants/', req.params.id + '.png'))) {
            res.sendFile(path.join(__dirname, '../images/restaurants/default.png'));
        }
        else {
            res.sendFile(path.join(__dirname, '../images/restaurants/', req.params.id + '.png'));
        }
    }
    else
        res.status(404).send('Not found');
});

/* GET dish image */
router.get('/dish/:id/:num', function(req, res, next) {
    if(req.params.id) {
        // Check if image file exists, if so send image file. If not, throw 404
        if(!fs.existsSync(path.join(__dirname, '../images/dishes/', req.params.id + '_' + req.params.num + '.png'))) {
            res.sendFile(path.join(__dirname, '../images/dishes/default.png'));
        }
        else {
            res.sendFile(path.join(__dirname, '../images/dishes/', req.params.id + '_' + req.params.num + '.png'));
        }
    }
    else
        res.status(404).send('Not found');
});

module.exports = router;
