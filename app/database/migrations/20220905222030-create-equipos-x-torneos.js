'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipo_x_torneos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipo_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'equipos',
          key: 'id'
        }

      },
      torneo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'torneos',
          key: 'id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipo_x_torneos');
  }
};