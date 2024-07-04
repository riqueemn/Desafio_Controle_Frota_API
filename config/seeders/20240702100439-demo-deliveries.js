'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Deliveries', [
      { truckId: 1, driverId: 1, cargoType: 'Eletrônicos', value: 5000.00, destination: 'Argentina', status: 'Pendente', createdAt: new Date(), updatedAt: new Date() },
      { truckId: 2, driverId: 2, cargoType: 'Combustível', value: 7000.00, destination: 'Nordeste', status: 'Concluída', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Deliveries', null, {});
  }
};
