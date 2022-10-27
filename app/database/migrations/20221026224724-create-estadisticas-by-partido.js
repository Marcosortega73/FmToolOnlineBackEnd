'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EstadisticasByPartidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partido_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Fixtures',
          key: 'id'
        }

      },
      estadistica_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estadisticas',
          key: 'id'
        }

      },
      jugador_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Jugadores',
          key: 'id'
        }
      },
      torneo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Torneos',
          key: 'id'
        }

      },
      cantidad: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EstadisticasByPartidos');
  }
};