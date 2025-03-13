import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import dotenv from 'dotenv';


dotenv.config();


const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 3306,
});

export default sequelize;