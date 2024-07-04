import express from "express"
import bodyParser from "body-parser"


import  Truck  from './config/models/truck.js'
import  Delivery  from './config/models/delivery.js'
import  Driver  from './config/models/driver.js'
import  User  from './config/models/user.js'
import  Address  from './config/models/address.js'
import  Carga  from './config/models/carga.js'

import cors from "cors"

import {Sequelize} from 'sequelize';


const sequelize = new Sequelize('sql7717788', 'sql7717788', 'fNvixGQhGu', {
  host: 'sql7.freemysqlhosting.net',
  dialect: 'mysql',
  port: '3306'
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/api/trucks', async (req, res) => {
    const trucks = await Truck.findAll();
    res.json(trucks);
  });
  
  app.post('/api/trucks', async (req, res) => {
    const truck = await Truck.create(req.body);
    res.json(truck);
  });
  
  app.put('/api/trucks/:id', async (req, res) => {
    const { id } = req.params;
    await Truck.update(req.body, { where: { id } });
    const updatedTruck = await Truck.findByPk(id);
    res.json(updatedTruck);
  });
  
  app.delete('/api/trucks/:id', async (req, res) => {
    const { id } = req.params;
    await Truck.destroy({ where: { id } });
    res.json({ message: 'Truck deleted' });
  });
  
  // Routes for Deliveries
  app.get('/api/deliveries', async (req, res) => {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  });

  app.post('/api/deliveries', async (req, res) => {
    const { truckId, driverId, cargoType, value, destination, hasInsurance, status } = req.body;

    try {
      const pendingDelivery = await Delivery.findOne({ where: { truckId, status: 'Pendente' } });
  
      if (pendingDelivery) {
        return res.status(400).json({ message: 'O caminhão já está associado a uma entrega pendente.' });
      }


      const deliveriesThisMonth = await Delivery.countDeliveriesThisMonth(truckId);
      if (deliveriesThisMonth >= 4) {
        return res.status(400).json({ message: 'O caminhão já atingiu o limite de 4 entregas este mês.' });
      }



      const driverDeliveriesThisMonth = await Delivery.countDeliveriesByDriverThisMonth(driverId);
      if (driverDeliveriesThisMonth >= 2) {
        return res.status(400).json({ message: 'O motorista já atingiu o limite de 2 entregas este mês.' });
      }



      const pendingNordesteDelivery = await Delivery.findOne({
        where: {
          driverId,
          status: 'Pendente',
          destination: 'Nordeste',
        },
      });
  


      if (destination == "Nordeste" && pendingNordesteDelivery) {
        return res.status(400).json({ message: 'O motorista já possui uma entrega pendente para o Nordeste.' });
      }



  
      let adjustedValue = value;
      if (destination == "Nordeste") {
        adjustedValue = value * 1.2; 
      } else if (destination == "Argentina") {
        adjustedValue = value * 1.4; 
      } else if (destination == "Amazônia") {
        adjustedValue = value * 1.3; 
      }


      const delivery = await Delivery.create({
        truckId, driverId, cargoType, value: adjustedValue, destination, hasInsurance, status
      });
      res.json(delivery);

      //const { id } = req.params;
      await Truck.update({status: "Indisponível"}, { where: { id: truckId } });
      await Driver.update({status: "Indisponível"}, { where: { id: driverId } });
      //const updatedTruck = await Truck.findByPk(id);
      res.json(Truck);
      res.json(Driver);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Erro ao adicionar entrega.' });
    }
  });
  
  app.put('/api/deliveries/:id', async (req, res) => {
    const { id } = req.params;
    const { truckId, driverId, cargoType, value, destination, hasInsurance, status } = req.body;
  
    try {
      const delivery = await Delivery.findByPk(id);
  
      if (!delivery) {
        return res.status(404).json({ message: 'Entrega não encontrada.' });
      }

      if(status != "Concluído"){

      const pendingDelivery = await Delivery.findOne({ where: { truckId, status: 'Pendente' } });
  
      if (pendingDelivery && truckId !== delivery.truckId) {
        return res.status(400).json({ message: 'O caminhão já está associado a uma entrega pendente.' });
      }
  
      if (truckId !== delivery.truckId) {
        const deliveriesThisMonth = await Delivery.countDeliveriesThisMonth(truckId);
        if (deliveriesThisMonth >= 4) {
          return res.status(400).json({ message: 'O caminhão já atingiu o limite de 4 entregas este mês.' });
        }
      }

      const driverDeliveriesThisMonth = await Delivery.countDeliveriesByDriverThisMonth(driverId);
      if (driverDeliveriesThisMonth >= 2) {
        return res.status(400).json({ message: 'O motorista já atingiu o limite de 2 entregas este mês.' });
      }


      const pendingNordesteDelivery = await Delivery.findOne({
        where: {
          driverId,
          status: 'Pendente',
          destination: 'Nordeste',
        },
      });
      if (destination == "Nordeste" && pendingNordesteDelivery && pendingNordesteDelivery.id !== id) {
        return res.status(400).json({ message: 'O motorista já possui uma entrega pendente para o Nordeste.' });
      }

    }

      let adjustedValue = value;
      if (destination == "Nordeste") {
        adjustedValue = value * 1.2; 
      } else if (destination == "Argentina") {
        adjustedValue = value * 1.4; 
      } else if (destination == "Amazônia") {
        adjustedValue = value * 1.3; 
      }

  
      await delivery.update({ truckId, driverId, cargoType, value: adjustedValue, destination, hasInsurance, status });
      res.json(delivery);

      console.log(truckId)


      if(status == "Concluído"){
        await Truck.update({status: "Disponível"}, { where: { id: truckId } });
        const driver = await Driver.findByPk(driverId);
        await Driver.update({status: "Disponível", deliveriesCompleted: driver.deliveriesCompleted + 1}, { where: { id: driverId } });
        res.json(Truck);
        res.json(Driver);
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar entrega.' });
    }
  });

  
  app.delete('/api/deliveries/:id', async (req, res) => {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    await Delivery.destroy({ where: { id } });
    res.json({ message: 'Delivery deleted' });
    await Truck.update({status: "Disponível"}, { where: { id: delivery.truckId } });
    await Driver.update({status: "Disponível"}, { where: { id: delivery.driverId } });
  });
  
  // Routes for Drivers
  app.get('/api/drivers', async (req, res) => {
    const drivers = await Driver.findAll();
    res.json(drivers);
  });
  
  app.post('/api/drivers', async (req, res) => {
    console.log(req.body)
    const driver = await Driver.create(req.body);
    res.json(driver);
  });
  
  app.put('/api/drivers/:id', async (req, res) => {
    const { id } = req.params;
    await Driver.update(req.body, { where: { id } });
    const updatedDriver = await Driver.findByPk(id);
    res.json(updatedDriver);
  });
  
  app.delete('/api/drivers/:id', async (req, res) => {
    const { id } = req.params;
    await Driver.destroy({ where: { id } });
    res.json({ message: 'Driver deleted' });
  });
  
  // Routes for Reports
  app.get('/api/reports', async (req, res) => {
    const reports = await Report.findAll();
    res.json(reports);
  });
  
  app.post('/api/reports', async (req, res) => {
    const report = await Report.create(req.body);
    res.json(report);
  });
  
  app.put('/api/reports/:id', async (req, res) => {
    const { id } = req.params;
    await Report.update(req.body, { where: { id } });
    const updatedReport = await Report.findByPk(id);
    res.json(updatedReport);
  });
  
  app.delete('/api/reports/:id', async (req, res) => {
    const { id } = req.params;
    await Report.destroy({ where: { id } });
    res.json({ message: 'Report deleted' });
  });

  // Routes for Addresses
  app.get('/api/addresses', async (req, res) => {
    const addresses = await Address.findAll();
    res.json(addresses);
  });

  // Routes for Cargas
  app.get('/api/cargas', async (req, res) => {
    const cargas = await Carga.findAll();
    res.json(cargas);
  });
  
  // Routes for Users
  app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });
  
  app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
  });
  
  app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.update(req.body, { where: { id } });
    const updatedUser = await User.findByPk(id);
    res.json(updatedUser);
  });
  
  app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({ message: 'User deleted' });
  });

  app.get('/api/dashboard/summary', async (req, res) => {
    const totalTrucks = await Truck.count();
    const totalDeliveries = await Delivery.count();
    const totalCompletedDeliveries = await Delivery.count({ where: { status: 'Concluído' } });
    const totalPendingDeliveries = await Delivery.count({ where: { status: 'Pendente' } });
    
    const summary = {
      totalTrucks,
      totalDeliveries,
      totalCompletedDeliveries,
      totalPendingDeliveries,
    };
  
    res.json(summary);
  });
  
  app.get('/api/dashboard/financial-summary', async (req, res) => {
    const queryToday  = `
      SELECT SUM(value) AS totalValueToday
      FROM deliveries
      WHERE DATE(createdAt) = CURDATE()
    `;

    const [result] = await sequelize.query(queryToday, { type: sequelize.QueryTypes.SELECT });
    const totalValueToday = result.totalValueToday || 0;
  
    const queryWeek = `
      SELECT SUM(value) AS totalValueWeek
      FROM deliveries
      WHERE WEEK(createdAt) = WEEK(CURDATE())
    `;

    const [resultWeek] = await sequelize.query(queryWeek, { type: sequelize.QueryTypes.SELECT });
    const totalValueWeek = resultWeek.totalValueWeek || 0;
  
    const queryMonth = `
      SELECT SUM(value) AS totalValueMonth
      FROM deliveries
      WHERE YEAR(createdAt) = YEAR(CURDATE())
        AND MONTH(createdAt) = MONTH(CURDATE())
    `;

    const [resultMonth] = await sequelize.query(queryMonth, { type: sequelize.QueryTypes.SELECT });
    const totalValueMonth = resultMonth.totalValueMonth || 0;
  
    const financialSummary = {
      totalValueToday,
      totalValueWeek,
      totalValueMonth,
    };
  
    res.json(financialSummary);
  });
  
  app.get('/api/dashboard/alerts', async (req, res) => {
    const valuableDeliveries = await Delivery.findAll({ where: { value: { [Sequelize.Op.gt]: 10000 } } });
    const electronicsWithoutInsurance = await Delivery.findAll({ where: {hasInsurance: 0 } });
    const dangerousDeliveries = await Delivery.findAll({ where: { cargoType: 'Combustível' } });
  
    const alerts = {
      valuableDeliveries,
      electronicsWithoutInsurance,
      dangerousDeliveries,
    };
  
    res.json(alerts);
  });
  
  
  
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
