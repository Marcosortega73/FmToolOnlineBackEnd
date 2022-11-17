'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reunions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: true
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: true,
      },

      nombre: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reunions');
  }
};