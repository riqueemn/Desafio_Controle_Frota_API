'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
      { local: 'Argentina', createdAt: new Date(), updatedAt: new Date() },
      { local: 'Nordeste', createdAt: new Date(), updatedAt: new Date() },
      { local: 'Amazônia', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
