var express = require('express');
var router = express.Router();

const database = require("../database.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  database.Restaurant.findAll({raw: true}).then(function(restaurants) {

      // Remove id from info
      for(var i=0;i<restaurants.length;i++) {
        delete restaurants[0].id;
      }
      res.json(restaurants);
  }).catch(function(err) { res.json({error: "Database error: " + err}); });
});

module.exports = router;
