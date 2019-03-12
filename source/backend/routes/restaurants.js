var express = require('express');
var router = express.Router();

const database = require("../database.js");

/* GET restaurant listing. */
router.get('/:id', function(req, res, next) {
  console.log(req.params);
  database.Restaurant.findAll({raw: true}).then(function(restaurants) {
      // Remove index from info
      for(var i=0;i<restaurants.length;i++) {
        delete restaurants[0].index;
      }
      res.json(restaurants);
  }).catch(function(err) { res.json({error: "Database error: " + err}); });
});

module.exports = router;
