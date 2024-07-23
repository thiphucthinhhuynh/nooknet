'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FollowRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FollowRequest.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
      FollowRequest.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiverId' });
    }
  }
  FollowRequest.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'FollowRequest',
  });
  return FollowRequest;
};
