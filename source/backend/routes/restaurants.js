var express = require('express');
var router = express.Router();

const database = require("../database.js");

const MAX_LISTING = 5;

/* GET restaurant listing. */
router.get('/', function(req, res, next) {
  database.Restaurant.findAll({limit: MAX_LISTING, raw: true}).then(function(restaurants) {
      // Remove index from info
      for(var i=0;i<restaurants.length;i++) {
        restaurants[i].id = database.Restaurant.encodeID(restaurants[i].index);
        delete restaurants[i].index;
      }
      res.json(restaurants);
  }).catch(function(err) { res.json({error: "Database error: " + err}); });
});

router.get('/get/:id', function(req, res, next) {  
    if(!req.params.id)
       res.json({error: "Invalid data"});

    database.Restaurant.find({where: {
      index: database.Restaurant.decodeID(req.params.id)
    },
    raw: true}).then(function(restaurant) {
      // Remove index from info
      restaurant.id = req.params.id
      delete restaurant.index;

      res.json(restaurant);
    }).catch(function(err) { res.json({error: "Database error: " + err}); });
    
});

// Get list of dishes owned by a restaurant
router.get('/dishes/:id', function(req, res, next) {
    if(!req.params.id)
        res.json({error: "Invalid data"});

    // Find all dishes under the requested restaurant
    database.Dish.findAll({
        where: {
            restaurant: database.Restaurant.decodeID(req.params.id)
        },
        raw: true
    }).then(function(dishes) {
        // Split dishes into categories
        var categories = [];

        for(var i=0;i<dishes.length;i++) {
            dishes[i].id = database.Dish.encodeID(dishes[i].index);
            delete dishes[i].index;

            var exists = false;
            for(var c=0;c<categories.length;c++) {
                if(categories[c] && dishes[i].category == categories[c].name) {
                    categories[c].push(dishes[i]);
                    exists = true;
                }
            }

            if(!exists) {
                let category = {
                    name: dishes[i].category,
                    dishes: [dishes[i]]
                };
                categories.push(category);
            }
        }
        console.log(categories)
        res.json(categories);
    }).catch(function(err) { res.json({error: "Database error: " + err}); });
});

/* GET restaurant listing based on search query. */
router.get('/:query/:page', function(req, res, next) {

  if(!req.params.query && !req.params.page && typeof req.params.page == "number")
     res.json({error: "Invalid data"});
     
  let query = req.params.query.split(" ");
  // Split each word in query into a seperate iLike condition for the SQL call
  query = query.map(function(item) {
    return {
      [database.Sequelize.Op.iLike]: '%' + item + '%'
    };
  });
  if(query) {
    database.Restaurant.findAndCountAll({where: {
          name: {
              [database.Sequelize.Op.or]: query
          }
      }}).then(function(data) {
      let page = req.params.page;
      let pages = Math.ceil(data.count / MAX_LISTING);
      let offset = MAX_LISTING * (page - 1);

      database.Restaurant.findAll({
        limit: MAX_LISTING,
        offset: offset,
        where: {
            name: {
                [database.Sequelize.Op.or]: query
            }
        },
        raw: true
      }).then(function(restaurants) {
          // Remove index from info
          for(var i=0;i<restaurants.length;i++) {
            restaurants[i].id = database.Restaurant.encodeID(restaurants[i].index);
            delete restaurants[i].index;
          }
          res.json({restaurants: restaurants, pageCount: pages, total: data.count});
      }).catch(function(err) { res.json({error: "Database error: " + err}); });
    });
  }
  else {
    res.json();
  }
});

module.exports = router;
