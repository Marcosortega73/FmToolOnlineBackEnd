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
      nombre: {
        type: Sequelize.STRING
      },
      tipo: {
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
      total_de_equipos: {
        type: Sequelize.INTEGER
      },
      total_grupos: {
        type: Sequelize.INTEGER
      },
      temporada: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Torneos');
  }
};