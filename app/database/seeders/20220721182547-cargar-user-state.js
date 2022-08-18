'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserStates', [
    {
      id: 1,
      nombre: 'Pendiente',
      color: '#ffc107',
      rol: 'USER'
    }, 
    {
      id: 2,
      nombre: 'Trabajando',
      color: '#673ab7',
      rol: 'MANAGER'
    }, 
    {
      id: 3,
      nombre: 'Rechazado',
      color: '#dc3545',
      rol: 'USER'
    },
    {
      id: 4,
      nombre: 'En Paro',
      color: '#3f51b5',
      rol: 'MANAGER'
    },
    {
      id: 5,
      nombre: 'Activo',
      color: '#28a745',
      rol: 'ADMIN'
    },
    {
      id: 6,
      nombre: 'Inactivo',
      color: '#616161',
      rol: 'ADMIN'
    }

  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserStates', null, {});
  }
};
