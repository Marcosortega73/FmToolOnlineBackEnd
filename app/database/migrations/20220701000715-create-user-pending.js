'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPendings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserStates',
          key: 'id'
        },
        allowNull: true,
        defaultValue: 1,
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USER',
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserPendings');
  }
};