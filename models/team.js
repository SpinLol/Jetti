'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init(
    {
      teamName: DataTypes.STRING,
      playerId1: DataTypes.INTEGER,
      playerId2: DataTypes.INTEGER,
      playerId3: DataTypes.INTEGER,
      playerId4: DataTypes.INTEGER,
      playerId5: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Team',
    },
  );
  return Team;
};
