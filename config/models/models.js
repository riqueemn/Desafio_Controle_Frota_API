const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // ou outra configuração de banco de dados

const Truck = sequelize.define('truck', {
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = {
  Truck,
  // outros modelos
};
