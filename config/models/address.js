import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Importa a configuração do Sequelize

const Address = sequelize.define('address', {
  local: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }
});

export default Address;
