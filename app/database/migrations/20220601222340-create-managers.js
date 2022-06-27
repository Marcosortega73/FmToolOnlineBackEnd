'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Managers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nacimiento: {
        type: Sequelize.DATE,
        
      },

      nacionalidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nacionalidades',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Managers');
  }
};