import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Importa a configuração do Sequelize

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

export default Truck;
