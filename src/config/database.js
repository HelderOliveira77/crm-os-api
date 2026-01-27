// src/config/database.js

// ESTÁ NO FICHEIRO SERVER.JS
// require('dotenv').config();

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000 // Aumenta o tempo de espera para 60 segundos
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
   
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
