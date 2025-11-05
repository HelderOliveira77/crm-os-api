// src/models/Order.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  // NOVOS CAMPOS PARA ENRIQUECER A OS
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Cliente Não Especificado'
  },
  scheduled_date: {
    type: DataTypes.DATEONLY, // Apenas a data
    allowNull: true,
  },
  scheduled_time: {
    type: DataTypes.TIME, // Apenas a hora
    allowNull: true,
  },
  // CAMPOS EXISTENTES
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pendente',
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'Média',
  }

});

module.exports = Order;