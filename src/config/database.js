// src/config/database.js

const { Sequelize } = require('sequelize');

// 1. A variável Sequelize precisa ser criada aqui!
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados SQLite estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
  }
}

// 2. O objeto sequelize precisa ser exportado!
module.exports = {
  sequelize,
  connectDB
};