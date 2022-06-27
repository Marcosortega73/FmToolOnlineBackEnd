'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jugadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nacionalidad_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Nacionalidades',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      equipo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Equipos',
          key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'

    },
      altura: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      peso: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ca: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cp: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      valor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jugadores');
  }
};