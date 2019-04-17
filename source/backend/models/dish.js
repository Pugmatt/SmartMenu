var Hashids = require('hashids');

var hashids = new Hashids("Dv06lngB", 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

const database = require("../database.js");

module.exports = function(sequelize, DataTypes) {
    const Dish = sequelize.define("Dish", {
        index: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        restaurant: DataTypes.INTEGER,
        category: DataTypes.TEXT,
        name: DataTypes.TEXT,
        description: DataTypes.TEXT,
        rating: DataTypes.INTEGER,
        price: DataTypes.DECIMAL,
        images: DataTypes.INTEGER,
    }, {
        tableName: 'dishes',
        timestamps: false,
    } );

    Dish.getRating = function(dish, callback) {
      database.Review.findAll({
          where: {
              dish: dish.index
          }
      }).then(function(reviews) {
          var average = 0;
          if(reviews.length > 0) {
              // Get average of review ratings
              for (var i = 0; i < reviews.length; i++)
                  average += reviews[i].rating;
              average = Math.round(average / reviews.length);
          }
          callback(average);
      }).catch(function (err) {
          if (err) {
              return callback(err)
          }
      });
    };

    Dish.encodeID = function(index) {
        return hashids.encode(index);
    };

    Dish.decodeID = function(hash) {
        return hashids.decode(hash);
    };

    return Dish;
};