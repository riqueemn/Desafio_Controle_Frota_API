'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cargas', [
      { tipo: 'Eletrônicos', createdAt: new Date(), updatedAt: new Date() },
      { tipo: 'Combustível', createdAt: new Date(), updatedAt: new Date() },
      { tipo: 'Comida', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cargas', null, {});
  }
};
