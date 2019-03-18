var express = require('express');
var router = express.Router();

const database = require("../database.js");

const func = require('../functions.js');

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

    database.Dish.find({where: {
      index: database.Dish.decodeID(req.params.id)
    },
    raw: true}).then(function(dish) {
      // Remove index from info
      dish.id = req.params.id
      delete dish.index;

      res.json(dish);
    }).catch(function(err) { res.json({error: "Database error: " + err}); });
    
});

router.post('/add', func.isLoggedIn, function(req, res, next) {
    if(req.body && req.body.name && req.body.category && req.body.description && req.body.restaurant) {
        if(!(typeof req.body.name == 'string' && typeof req.body.category == 'string' && typeof req.body.description == 'string' &&
        typeof req.body.restaurant  == 'string'))
            res.json({error: "Invalid variable types"});
        else {
            if(database.Restaurant.decodeID(req.body.restaurant) == req.user.restaurant) {
                database.Dish.build({
                    name: req.body.name,
                    description: req.body.description,
                    restaurant: req.user.restaurant,
                    category: req.body.category,
                }).save().then(function(dish) {
                    res.json({dish: dish});
                }).catch(function(err) { res.json({error: "Database error: " + err}); });
            }
            else
                res.json({error: "Invalid permissions."});
        }
    }
    else
        res.json({error: "Invalid variables"});
    
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
