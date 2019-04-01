var Hashids = require('hashids');

var hashids = new Hashids("Dv06lngB", 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define("Review", {
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
        owner: DataTypes.TEXT,
        comment: DataTypes.TEXT,
        rating: DataTypes.INTEGER,
        dish: DataTypes.INTEGER,
    }, {
        tableName: 'reviews',
        timestamps: false,
    });

    Review.encodeID = function(index) {
        return hashids.encode(index);
    };

    Review.decodeID = function(hash) {
        return hashids.decode(hash);
    };

    return Review;
};