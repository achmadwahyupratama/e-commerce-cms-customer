'use strict';
const {
  Model
} = require('sequelize');
const { encode } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: models.Cart})
      User.hasMany(models.Cart, {foreignKey: 'UserId'})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty : {
          msg: 'Username can not be blank'
        },
        isUnique(value) {     
          return User.findOne({where:{username:value}})
            .then((founduser) => {
              if (founduser) {
                throw new Error('Username already exist');
              }
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty : {
          msg: 'Email can not be blank'
        },
        isEmail: {
          msg: 'Invalid Email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty : {
          msg: 'Password can not be blank'
        },
        hasSixChar(pass){
          if (pass.length < 6) {
            throw new Error('Password must has minimum 6 characters');
          }
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(instance => {
    instance.password = encode(instance.password)
  })
  return User;
};