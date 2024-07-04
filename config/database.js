import Sequelize from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize('sql7717788', 'sql7717788', 'fNvixGQhGu', {
    dialect: 'mysql',
    host: 'sql7.freemysqlhosting.net',
    port: '3306'
})

export default sequelize;