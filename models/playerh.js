'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerH extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerH.init(
    {
      playerId: DataTypes.INTEGER,
      skillLevel: DataTypes.FLOAT,
      userTag: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PlayerH',
    },
  );
  return PlayerH;
};
