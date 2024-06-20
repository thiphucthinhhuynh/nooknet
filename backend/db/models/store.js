'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.User), {
        as: 'Owner',
        foreignKey: 'ownerId'
      };
      Store.hasMany(models.Item, {
        foreignKey: 'storeId',
        onDelete: 'CASCADE'
      });
    }
  }
  Store.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    name: {
      type: DataTypes.STRING
    },
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
    ,
    description: {
      type: DataTypes.STRING,
      allowNull: true

    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};
