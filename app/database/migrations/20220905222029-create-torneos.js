'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Torneos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idFmrte: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nombre: {
        type: Sequelize.STRING
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'TipoTorneos',
          key: 'id'
        },
        allowNull: true,
      },
      region_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'continentes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      total_de_equipos: {
        type: Sequelize.INTEGER
      },
      total_grupos: {
        type: Sequelize.INTEGER
      },
      season_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Seasons',
          key: 'id'
        },
        allowNull: true,
      },
      total_equipos_grupos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Torneos');
  }
};