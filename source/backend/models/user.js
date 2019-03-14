var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
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
        username: DataTypes.TEXT,
        firstname: DataTypes.TEXT,
        lastname: DataTypes.TEXT,
        password: {
            type: DataTypes.STRING,
            set: function(val) {
              this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(10), null));
            }
        },
        email: DataTypes.TEXT,
        consumer: DataTypes.BOOLEAN,
        restaurant: DataTypes.INTEGER
    }, {
        tableName: 'users',
        timestamps: false,
    });

    return User;
};