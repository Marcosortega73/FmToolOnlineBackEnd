'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seasons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      equipo_campeon_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Equipos',
          key: 'id'
        },
        allowNull: true,
      },
      manager_campeon_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Managers',
          key: 'id'
        },
        allowNull: true,

      },
      equipo_mvp_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Equipos',
          key: 'id'
        },
        allowNull: true,
      },
      jugador_mvp_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Jugadores',
          key: 'id'
        },
        allowNull: true,
      },
      jugador_goleador_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Jugadores',
          key: 'id'
        },
        allowNull: true,

      },
      jugador_asistente_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Jugadores',
          key: 'id'
        },
        allowNull: true,


      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seasons');
  }
};