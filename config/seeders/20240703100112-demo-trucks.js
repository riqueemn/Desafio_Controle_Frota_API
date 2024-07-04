'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Trucks', [
      { model: 'Model A', plate: 'ABC-1234', status: 'Disponível', createdAt: new Date(), updatedAt: new Date() },
      { model: 'Model B', plate: 'XYZ-5678', status: 'Indisponível', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Trucks', null, {});
  }
};
