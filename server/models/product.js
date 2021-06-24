'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {through: models.Cart})
      Product.hasMany(models.Cart, {foreignKey: 'ProductId'})
    }
  };
  Product.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: `Product's name required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: `Price required`
        },
        min: {
          args: 1,
          msg: `Price can not be negative`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: `Stock required`
        },
        min: {
          args: 1,
          msg: `Stock minimum is 1`
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: `Image url required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};