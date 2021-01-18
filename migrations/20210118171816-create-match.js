'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Match', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      matchResult: {
        type: Sequelize.INTEGER,
      },
      screenshotPath: {
        type: Sequelize.STRING,
      },
      teamId1: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Team',
        },
      },
      teamId2: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Team',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Match');
  },
};
