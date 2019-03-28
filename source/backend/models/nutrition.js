var Hashids = require('hashids');

var hashids = new Hashids("Dv06lngB", 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

module.exports = function(sequelize, DataTypes) {
    const Nutritional = sequelize.define("Nutritional", {
        index: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        dish: DataTypes.INTEGER,
        calories: DataTypes.INTEGER,
        total_fat: DataTypes.INTEGER,
        cholesterol: DataTypes.INTEGER,
        sodium: DataTypes.INTEGER
    }, {
        tableName: 'nutritions',
        timestamps: false,
    } );

    Nutritional.encodeID = function(index) {
        return hashids.encode(index);
    };

    Nutritional.decodeID = function(hash) {
        return hashids.decode(hash);
    };

    return Nutritional;
};