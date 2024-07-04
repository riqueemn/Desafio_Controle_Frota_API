import { Model, DataTypes, Op } from 'sequelize';
import sequelize from '../database.js';

class Delivery extends Model {
  static async countDeliveriesThisMonth(truckId) {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    return await Delivery.count({
      where: {
        truckId,
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });
  }

  static async countDeliveriesByDriverThisMonth(driver) {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    return await Delivery.count({
      where: {
        driverId: driver,
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });
  }
}

Delivery.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  truckId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargoType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendente',
  },
  hasInsurance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'delivery',
});

export default Delivery;


