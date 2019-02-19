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
    }, {
        tableName: 'restaurants',
        timestamps: false,
    });

    return Restaurant;
};