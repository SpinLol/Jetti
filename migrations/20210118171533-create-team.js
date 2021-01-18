'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Team', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamName: {
        type: Sequelize.STRING,
      },
      playerId1: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'PlayerH',
        },
        allowNull: true,
      },
      playerId2: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'PlayerH',
        },
        allowNull: true,
      },
      playerId3: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'PlayerH',
        },
        allowNull: true,
      },
      playerId4: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'PlayerH',
        },
        allowNull: true,
      },
      playerId5: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'PlayerH',
        },
        allowNull: true,
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
    await queryInterface.dropTable('Team');
  },
};
