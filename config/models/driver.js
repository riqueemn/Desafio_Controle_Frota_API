import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Driver = sequelize.define('drivers', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  truckId: DataTypes.STRING,
  deliveriesCompleted: DataTypes.INTEGER,
  status: DataTypes.STRING,
});

export default Driver;


