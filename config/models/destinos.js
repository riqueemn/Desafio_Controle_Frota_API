const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a configuração do Sequelize

const Destino = sequelize.define('destino', {
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Destino;
