"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Fixtures", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      num_fecha: {
        type: Sequelize.INTEGER,
      },
      equipo_local: {
        type: Sequelize.BIGINT,
        references: {
          model: "Equipos",
          key: "id",
        },
      },
      equipo_visitante: {
        type: Sequelize.BIGINT,
        references: {
          model: "Equipos",
          key: "id",
        },
      },
      goles_local: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      goles_visitante: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      torneo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Torneos",
          key: "id",
        },
      },
      fecha_desde: {
        type: Sequelize.DATE,
      },
      fecha_hasta: {
        type: Sequelize.DATE,
      },
      estado: {
        type: Sequelize.STRING,
      },
      grupo: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Fixtures");
  },
};
