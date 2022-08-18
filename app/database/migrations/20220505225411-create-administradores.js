'use strict';
const DataTypes = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('administradores', {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(64),
        validate: {
          is: /^[0-9a-f]{64}$/i,
        },
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ADMIN',
      },
      state_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'UserStates',
          key: 'id'
        },
        allowNull: true,
        defaultValue: 1,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('administradores');
  }
};