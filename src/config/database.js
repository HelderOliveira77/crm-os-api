// src/config/database.js

const { Sequelize } = require('sequelize');

// Configurações de Conexão MySQL
const DB_NAME = 'crm_os'; // <--- Nome da base de dados que criou no MySQL
const DB_USER = 'root';        // <--- Seu utilizador MySQL
const DB_PASS = 'multiponto_77'; // <--- Sua password MySQL
const DB_HOST = 'localhost';    // <--- Host (Geralmente localhost)
const DB_DIALECT = 'mysql';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false, // Defina como true para ver as queries SQL no console
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

async function connectDB() {
  try {
    // Tenta autenticar a conexão
    await sequelize.authenticate();
    console.log('🔌 Conexão ao MySQL estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao MySQL:', error);
    process.exit(1); // Sai do processo se a conexão falhar
  }
}

module.exports = {
  sequelize,
  connectDB
};