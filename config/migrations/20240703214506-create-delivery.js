'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      truckId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Trucks',
          key: 'id'
        }
      },
      driver: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cargoType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Remova esta parte para não adicionar a constraint única parcial
    // await queryInterface.addConstraint('Deliveries', {
    //   fields: ['truckId'],
    //   type: 'unique',
    //   name: 'unique_truck_pending_delivery',
    //   where: {
    //     status: 'Pendente'
    //   }
    // });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Deliveries');
  }
};
