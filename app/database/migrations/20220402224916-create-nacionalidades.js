'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nacionalidades', {
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
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      gentilicio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nombreCorto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      continente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'continentes',
          key: 'id',
        }
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Nacionalidades');
  }
};