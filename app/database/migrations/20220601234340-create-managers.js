'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Managers', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
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
        allowNull: true,
      },
      nacionalidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nacionalidades',
          key: 'id'
        },
        allowNull: true,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      //equipo_id FK
      equipo_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'Equipos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      state_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserStates',
          key: 'id'
        },
        allowNull: true,
        defaultValue: 1,
      },
      equipoFavorito: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      biografia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'MANAGER',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Managers');
  }
};