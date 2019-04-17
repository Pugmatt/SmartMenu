var express = require('express');
var router = express.Router();

const database = require("../database.js");

const func = require('../functions.js');

var fs = require('fs');

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
        database.Dish.getRating(dish, function(rating) {
            dish.rating = rating;
            // Remove index from info
            dish.id = req.params.id;
            delete dish.index;

            dish.restaurant = database.Restaurant.encodeID(dish.restaurant);

            database.Nutritional.find({
                where: {
                    dish: database.Dish.decodeID(req.params.id)
                },
                raw: true
            }).then(function (nutritional) {
                delete nutritional.index;
                dish.nutritional = nutritional;
                fs.readdir("./images/dishes/", (err, files) => {
                    if (err) console.log(err);

                    let images = [];
                    for (const file of files) {
                        if (file.indexOf(dish.id) != -1)
                            images.push(file.replace(dish.id + "_", "").replace(".png", ""));
                    }
                    dish.images = images;
                    res.json(dish);
                });
            });
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
                    dish: dish.index
                },
                raw: true
            }).then(function(reviews) {
                if(reviews) {
                    for (var i = 0; i < reviews.length; i++) {
                        // Remove index and dish
                        delete reviews[i].index;
                        delete reviews[i].dish;
                    }
                    convertUserIds(reviews, 0, function (result) {
                        res.json({reviews: result});
                    });
                }
                else {
                    res.json({reviews: []});
                }
            });
        }
        else
            res.json({error: "Dish does not exist."});
    }).catch(function(err) { res.json({error: "Database error: " + err}); });

});

// Take array of reviews and convert review owner IDs to usernames
function convertUserIds(reviews, i, callback) {
    // If no more reviews, return empty
    if(reviews.length <= i)
        return callback([]);

    database.User.findOne({
        where: {
            index: reviews[i].owner
        }
    }).then(function(user) {
        if(user) {
            reviews[i].username = user.firstname + " " + user.lastname;
        }
        else {
            reviews[i].username = "N/A";
        }
        delete reviews[i].owner;
        convertUserIds(reviews, i+1, function(result) {
            // Add to current result and callback
            result.push(reviews[i]);
            callback(result);
        });
    });
}

router.post('/remove/', func.isLoggedIn, function(req, res, next) {
    if (!(req.body && req.body.id))
        res.json({error: "Invalid data"});
    else {
        database.Dish.findOne({
            where: {
                index: database.Dish.decodeID(req.body.id)
            }
        }).then(function (dish) {
            if(dish) {
                if (dish.dataValues.restaurant == req.user.restaurant) {
                    fs.readdir("./images/dishes/", (err, files) => {
                        if (err) console.log(err);

                        for (const file of files) {
                            if(file.indexOf(req.body.id) != -1) {
                                fs.unlink("./images/dishes/" + file, err => {
                                    if (err) console.log(err);
                                });
                            }
                        }
                    });
                    dish.destroy().then(function () {
                        res.json({success: true});
                    }).catch(function (err) {
                        res.json({error: "Database error: " + err});
                    });
                }
                else {
                    res.json({error: "Permission denied"});
                }
            }
            else
                res.json({error: "Dish does not exist"});
        }).catch(function (err) {
            res.json({error: "Database error: " + err});
        });
    }
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
                    console.log(database.Dish.decodeID(req.body.dish));
                    console.log(dish);
                    database.Review.build({
                        owner: req.user.index,
                        comment: req.body.comment,
                        rating: req.body.rating,
                        dish: database.Dish.decodeID(req.body.dish)[0]
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
    if(req.body && req.body.name && req.body.price && req.body.category && req.body.description && req.body.restaurant) {
        if(!(typeof req.body.name == 'string' && typeof req.body.price == 'string' && !isNaN(req.body.price) && typeof req.body.category == 'string' && typeof req.body.description == 'string' &&
        typeof req.body.restaurant  == 'string' && req.body.description.length <= 2000 && req.body.name.length <= 50 && req.body.name.length > 0 && req.body.category.length > 0 && req.body.restaurant.length > 0))
            res.json({error: "Invalid variable types"});
        else {
            if(database.Restaurant.decodeID(req.body.restaurant) == req.user.restaurant) {
                database.Dish.build({
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    restaurant: req.user.restaurant,
                    category: req.body.category,
                    images: 0
                }).save().then(function(dish) {
                    if(req.body.nutritional) {
                        if (!req.body.nutritional.calories) {
                            req.body.nutritional.calories = -1;
                        }
                        if (!req.body.nutritional.total_fat) {
                            req.body.nutritional.total_fat = -1;
                        }
                        if (!req.body.nutritional.cholesterol) {
                            req.body.nutritional.cholesterol = -1;
                        }
                        if (!req.body.nutritional.sodium) {
                            req.body.nutritional.sodium = -1;
                        }
                    }
                    else {
                        req.body.nutritional = {};
                        req.body.nutritional.calories = -1;
                        req.body.nutritional.total_fat = -1;
                        req.body.nutritional.cholesterol = -1;
                        req.body.nutritional.sodium = -1;
                    }
                    database.Nutritional.build({
                        calories: req.body.nutritional.calories,
                        total_fat: req.body.nutritional.total_fat,
                        cholesterol: req.body.nutritional.cholesterol,
                        sodium: req.body.nutritional.sodium,
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

router.post('/modify', func.isLoggedIn, function(req, res, next) {
    if(req.body && req.body.id && req.body.name && req.body.price && !isNaN(req.body.price) && req.body.category && req.body.description && req.body.restaurant) {
        if(!(typeof req.body.id == 'string' && !isNaN(req.body.price) && typeof req.body.name == 'string' && typeof req.body.category == 'string' && typeof req.body.description == 'string' &&
            typeof req.body.restaurant  == 'string' && req.body.description.length <= 2000 && req.body.name.length <= 50 && req.body.name.length > 0 && req.body.category.length > 0 && req.body.restaurant.length > 0))
            res.json({error: "Invalid variable types"});
        else {
            if(database.Restaurant.decodeID(req.body.restaurant) == req.user.restaurant) {
                database.Dish.find({
                    where: {
                        index: database.Dish.decodeID(req.body.id)
                    }
                }).then(function(dish) {
                    dish.name = req.body.name;
                    dish.price = req.body.price;
                    dish.description = req.body.description;
                    dish.category = req.body.category;
                    if(req.body.nutritional) {
                        if (!req.body.nutritional.calories) {
                            req.body.nutritional.calories = -1;
                        }
                        if (!req.body.nutritional.total_fat) {
                            req.body.nutritional.total_fat = -1;
                        }
                        if (!req.body.nutritional.cholesterol) {
                            req.body.nutritional.cholesterol = -1;
                        }
                        if (!req.body.nutritional.sodium) {
                            req.body.nutritional.sodium = -1;
                        }
                    }
                    else {
                        req.body.nutritional = {};
                        req.body.nutritional.calories = -1;
                        req.body.nutritional.total_fat = -1;
                        req.body.nutritional.cholesterol = -1;
                        req.body.nutritional.sodium = -1;
                    }
                    database.Nutritional.find({
                        where: {
                            dish: database.Dish.decodeID(req.body.id)
                        }
                    }).then(function (nutritional) {
                        if(nutritional) {
                            nutritional.calories = req.body.nutritional.calories;
                            nutritional.total_fat = req.body.nutritional.total_fat;
                            nutritional.cholesterol = req.body.nutritional.cholesterol;
                            nutritional.sodium = req.body.nutritional.sodium;
                            nutritional.save();
                            dish.nutritional = req.body.nutritional;
                        }
                        dish.save().then(function () {
                            delete dish.nutritional.index;
                            res.json({dish: dish});
                        });
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

router.post('/removeImage', func.isLoggedIn, function(req, res, next) {
    if (!(req.body && req.body.dish && req.body.dish.id && req.body.image))
        res.json({error: "Invalid data"});
    else {
        database.Dish.findOne({
            where: {
                index: database.Dish.decodeID(req.body.dish.id)
            },
            raw: true
        }).then(function (dish) {
            if (dish && dish.restaurant == req.user.restaurant) {
                fs.unlink("./images/dishes/" + req.body.dish.id + "_" + req.body.image + ".png", function (err) {
                    if (err) {
                        res.json({error: err});
                    }
                    else {
                        res.json({success: true});
                    }
                })
            }
        });
    }
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
