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

    User.findById = function (id, callback) {
        User.findOne({ where: { index: id } })
        .then(function (user) {
          if (!user) {
            var err = "User does not exist";
            return callback(err);
          }
          else {
            return callback(null, user);
          }
        }).catch(function (err) {
          if (err) {
              return callback(err)
          }
        });
    };

    User.authenticate = function (email, password, callback) {
        User.findOne({ where: { email: email } })
          .then(function (user) {
            if (!user) {
              return callback("User not found.");
            }
            bcrypt.compare(password, user.password, function (err, result) {
              if (result === true) {
                return callback(null, user);
              } else {
                return callback("Incorrect password.");
              }
            })
          }).catch(function (err) {
            if (err) {
                return callback(err)
            }
          });
      };

    return User;
};