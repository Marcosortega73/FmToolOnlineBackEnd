'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipos', {
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
      nacionalidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nacionalidades',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      torneo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Torneos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipos');
  }
};