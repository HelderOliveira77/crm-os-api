// src/config/database.js

// ESTÁ NO FICHEIRO SERVER.JS
// require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conexão ao MySQL estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao MySQL:', error);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  connectDB
};
