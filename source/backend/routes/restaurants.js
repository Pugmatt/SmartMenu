var express = require('express');
var router = express.Router();

const database = require("../database.js");

/* GET restaurant listing. */
router.get('/', function(req, res, next) {
  console.log(req.params);
  database.Restaurant.findAll({raw: true}).then(function(restaurants) {
      // Remove index from info
      for(var i=0;i<restaurants.length;i++) {
        delete restaurants[i].index;
      }
      res.json(restaurants);
  }).catch(function(err) { res.json({error: "Database error: " + err}); });
});

/* GET restaurant listing based on search query. */
router.get('/:query', function(req, res, next) {

  if(!req.params.query)
     res.json({error: "Invalid data"});
     
  let query = req.params.query.split(" ");
  // Split each word in query into a seperate iLike condition for the SQL call
  query = query.map(function(item) {
    return {
      [database.Sequelize.Op.iLike]: '%' + item + '%'
    };
  });
  if(query) {
    database.Restaurant.findAll({
      where: {
          name: {
              [database.Sequelize.Op.or]: query
          }
      },
      raw: true
    }).then(function(restaurants) {
        // Remove index from info
        for(var i=0;i<restaurants.length;i++) {
          delete restaurants[i].index;
        }
        res.json(restaurants);
    }).catch(function(err) { res.json({error: "Database error: " + err}); });
  }
  else {
    res.json();
  }
});

module.exports = router;
