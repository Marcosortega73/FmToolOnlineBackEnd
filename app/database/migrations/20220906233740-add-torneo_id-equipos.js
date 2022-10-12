'use strict';

module.exports = {
  async up (queryInterface, Sequelize, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.sequelize.transaction(t => {
     return Promise.all([
      queryInterface.addColumn('Equipos', 'torneo_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Torneos',
          key: 'id'
        }
      }, { transaction: t }),
    ]);
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('equipos', 'torneo_id', { transaction: t }),
      ]);
    }
    );


  }
};
