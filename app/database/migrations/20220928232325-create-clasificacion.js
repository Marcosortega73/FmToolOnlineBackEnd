'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clasificacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partidos_jugados: {
        type: Sequelize.INTEGER
      },
      partidos_ganados: {
        type: Sequelize.INTEGER
      },
      partidos_empatados: {
        type: Sequelize.INTEGER
      },
      partidos_perdidos: {
        type: Sequelize.INTEGER
      },
      goles_favor: {
        type: Sequelize.INTEGER
      },
      goles_contra: {
        type: Sequelize.INTEGER
      },
      diferencia_goles: {
        type: Sequelize.INTEGER
      },
      puntos: {
        type: Sequelize.INTEGER
      },
      equipo_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Equipos',
          key: 'id'
      },
      },
      torneo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Torneos',
          key: 'id'
        },

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
    await queryInterface.dropTable('Clasificacions');
  }
};