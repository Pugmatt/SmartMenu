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

      database.Nutritional.find({where: {
        dish: database.Dish.decodeID(req.params.id)
      },
      raw: true}).then(function(nutritional) {
        delete nutritional.index;
        dish.nutritional = nutritional;
        res.json(dish);
      });
    }).catch(function(err) { res.json({error: "Database error: " + err}); });
    
});

router.get('/reviews/get/:id', function(req, res, next) {
    if(!req.params.id)
        res.json({error: "Invalid data"});

    database.Dish.find({where: {
            index: database.Dish.decodeID(req.params.id)
        },
        raw: true}).then(function(dish) {
        if(dish) {
            database.Review.findAll({
                where: {
                    dish: database.Dish.decodeID(req.params.id)
                },
                raw: true
            }).then(function(reviews) {
               for(var i=0;i<reviews.length;i++) {
                   delete reviews[i].index;
               }
               res.json(reviews);
            });
        }
        else
            res.json({error: "Dish does not exist."});


        res.json(dish);
    }).catch(function(err) { res.json({error: "Database error: " + err}); });

});

router.post('/reviews/add', func.isLoggedIn, function(req, res, next) {
    if (req.body && req.body.comment && req.body.rating && req.body.dish) {
        if (!(typeof req.body.comment == 'string' && typeof req.body.rating == 'number' && typeof req.body.dish == 'string' && req.body.comment.length < 1000 && req.body.comment.length > 0 && req.body.rating > 0 && req.body.rating <= 5 && [1,2,3,4,5].indexOf(req.body.rating) != -1)
        && req.body.dish.length > 0)
            res.json({error: "Invalid variable types"});
        else {
            database.Dish.findOne({
                where: {
                    index: database.Dish.decodeID(req.body.dish)
                },
                raw: true
            }).then(function(dish) {
                if(dish) {
                    console.log(req.body.dish);
                    console.log(dish);
                    database.Review.build({
                        owner: req.user.index,
                        comment: req.body.comment,
                        rating: req.body.rating,
                        dish: database.Dish.decodeID(req.body.dish)
                    }).save().then(function(review) {
                        delete review.index;
                        review.owner = req.user.username;
                       res.json({review: review});
                    });
                }
                else {
                    res.json({error: "Dish does not exist."});
                }
            }).catch(function(err) { res.json({error: "Database error: " + err}); });
        }
    }
});

router.post('/add', func.isLoggedIn, function(req, res, next) {
    if(req.body && req.body.name && req.body.category && req.body.description && req.body.restaurant) {
        if(!(typeof req.body.name == 'string' && typeof req.body.category == 'string' && typeof req.body.description == 'string' &&
        typeof req.body.restaurant  == 'string' && req.body.description.length <= 2000 && req.body.name.length <= 50 && req.body.name.length > 0 && req.body.category.length > 0 && req.body.restaurant.length > 0))
            res.json({error: "Invalid variable types"});
        else {
            if(database.Restaurant.decodeID(req.body.restaurant) == req.user.restaurant) {
                database.Dish.build({
                    name: req.body.name,
                    description: req.body.description,
                    restaurant: req.user.restaurant,
                    category: req.body.category,
                    images: 0
                }).save().then(function(dish) {
                    if(!req.body.calories) {
                        req.body.calories = -1;
                    }
                    if(!req.body.total_fat) {
                        req.body.total_fat = -1;
                    }
                    if(!req.body.cholesterol) {
                        req.body.cholesterol = -1;
                    }
                    if(!req.body.sodium) {
                        req.body.sodium = -1;
                    }
                    database.Nutritional.build({
                        calories: req.body.calories,
                        total_fat: req.body.total_fat,
                        cholesterol: req.body.cholesterol,
                        sodium: req.body.sodium,
                        dish: dish.index
                    }).save().then(function(nutritional){
                        res.json({dish: {
                            id: database.Dish.encodeID(dish.index),
                            name: dish.name,
                            description: dish.name,
                            restaurant: database.Restaurant.encodeID(dish.restaurant),
                            category: dish.category,
                            images: 1,
                            nutritional: nutritional
                        }});
                    }).catch(function(err) { res.json({error: "Database error: " + err}); });
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
