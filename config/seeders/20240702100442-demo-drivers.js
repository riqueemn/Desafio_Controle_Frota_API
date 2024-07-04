'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Drivers', [
      { name: 'Driver A', TruckId: 1, deliveriesCompleted: 0, status: "Disponível" , createdAt: new Date(), updatedAt: new Date() },
      { name: 'Driver B', TruckId: 2, deliveriesCompleted: 0, status: "Disponível", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drivers', null, {});
  }
};
