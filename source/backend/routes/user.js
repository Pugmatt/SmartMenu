var express = require('express');
var passport = require('passport');
var router = express.Router();

/* */
const database = require("../database.js");

/* Authenticate user */
router.post('/login', passport.authenticate('local'), function(req, res, next) {
  if(typeof req.user == 'string') {
    res.json({err: req.user});
  }
  else {
    res.json({user: req.user});
  }
});

/* POST register new user */
router.post('/create', function(req, res, next) {
  if(req.body && req.body.consumer && req.body.username && req.body.password && req.body.email && req.body.firstname && req.body.lastname) {
    
    var valid = infoValid(req.body);

    if(valid != "y")
      res.json({error: valid});
    else {
      database.User.findOne({
        where: {
          username: req.body.username
        }
      }).then(function(user) {
        if(user)
          res.json({error: "Username already exists"});
        else {
          database.User.find({
            where: {
              email: req.body.email
            }
          }).then(function(user) {
            if(user)
              res.json({error: "Email already exists"});
            else {
              database.User.build({
                consumer: req.body.consumer,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname
              }).save().then(function() { res.json({user: "success"}); });
            }
          });
        }
      });
    }
  }
  else if(req.body && !req.body.consumer && req.body.password && req.body.email && req.body.firstname && req.body.lastname
    && req.body.restaurant && req.body.restaurant.name && req.body.restaurant.description) {
    
    var valid = infoValid(req.body);

    if(valid != "y")
      res.json({error: valid});
    else {
      database.Restaurant.build({
        name: req.body.restaurant.name,
        description: req.body.restaurant.description,
      }).save().then(function(restaurant) {
        database.User.build({
          consumer: req.body.consumer,
          password: req.body.password,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          restaurant: restaurant.index,
        }).save().then(function() { res.json({user: "success"}); });
      });
    }
  }
  else {
    res.json({error: "Required data does not exist."});
  }
});

// Check if sent information valid
function infoValid(body) {
  if(body.consumer) {
    // Check variables are correct types
    if(!(typeof body.username == 'string' && typeof body.password == 'string' && typeof body.email == 'string' &&
      typeof body.firstname == 'string' && typeof body.lastname == 'string'))
      return "Invalid variable types";

    // Check if variables have correct lengths and properties
    if(body.username.length < 3 || body.username.length > 20)
      return "Username must greater than 3 and less than 20 characters";
    else if(body.password.length < 6 || body.password.length > 20)
      return "Password must greater than 6 and less than 20 characters";
    else if(!validateEmail(body.email))
      return "Invalid email address";
    else if(body.firstname.length < 1 || body.firstname.length > 50 ||
      body.lastname.length < 1 && body.lastname.length > 50)
      return "Names must greater than 1 and less than 20 characters"
  }
  else {
    // Check variables are correct types
    if(!(typeof body.password == 'string' && typeof body.email == 'string' &&
      typeof body.firstname == 'string' && typeof body.lastname == 'string' &&
      typeof body.restaurant.name == 'string' && typeof body.restaurant.description == 'string'))
      return "Invalid variable types";

    // Check if variables have correct lengths and properties
    if(body.restaurant.name.length < 3 || body.restaurant.name.length > 50)
      return "Company Name must greater than 3 and less than 50 characters";
    else if(body.restaurant.description.length < 0 || body.restaurant.description.length > 2000)
      return "Company description must greater than 0 and less than 2000 characters";
    else if(body.password.length < 6 || body.password.length > 20)
      return "Password must greater than 6 and less than 20 characters";
    else if(!validateEmail(body.email))
      return "Invalid email address";
    else if(body.firstname.length < 1 || body.firstname.length > 50 ||
      body.lastname.length < 1 && body.lastname.length > 50)
      return "Names must greater than 1 and less than 20 characters"
  }

  return "y";
} 

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = router;
