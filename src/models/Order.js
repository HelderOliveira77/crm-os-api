// src/models/Order.js

const { DataTypes } = require('sequelize');
// 1. A importação precisa usar a desestruturação { sequelize }
// 2. O caminho para a pasta 'config' precisa estar correto (../config/database)
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
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pendente', 
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'Média', 
  },
  
}, {

    tableName: 'Orders',
});

module.exports = Order;