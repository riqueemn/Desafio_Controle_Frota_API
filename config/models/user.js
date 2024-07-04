import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Importa a configuração do Sequelize

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  role: DataTypes.STRING,
});

export default User;
