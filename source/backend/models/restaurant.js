var Hashids = require('hashids');

var hashids = new Hashids("Dv06lngB", 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

module.exports = function(sequelize, DataTypes) {
    const Restaurant = sequelize.define("Restaurant", {
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
        id: DataTypes.TEXT,
        name: DataTypes.TEXT,
        description: DataTypes.TEXT,
        address: DataTypes.TEXT,
        city: DataTypes.TEXT,
        state: DataTypes.TEXT
    }, {
        tableName: 'restaurants',
        timestamps: false,
    });

    Restaurant.getID = function(index) {
        return hashids.encode(index);
    };

    Restaurant.decodeID = function(hash) {
        return hashids.decode(hash);
    };

    return Restaurant;
};