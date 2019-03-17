var Hashids = require('hashids');

var hashids = new Hashids("Dv06lngB", 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

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
        name: DataTypes.TEXT,
        description: DataTypes.TEXT,
        rating: DataTypes.INTEGER
    }, {
        tableName: 'dishes',
        timestamps: false,
    });

    Dish.encodeID = function(index) {
        return hashids.encode(index);
    };

    Dish.decodeID = function(hash) {
        return hashids.decode(hash);
    };

    return Dish;
};