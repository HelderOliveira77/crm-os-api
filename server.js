// server.js

const orderRoutes = require('./src/routes/orders'); 
const express = require('express');

const { sequelize, connectDB } = require('./src/config/database');
const Order = require('./src/models/Order'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Forma simples
const path = require('path'); // <--- A LINHA DO 'path'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON nas requisições
app.use(express.json());


// 1. Configurar Rotas
app.use('/api/orders', orderRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('API de Gestão de Ordens de Serviço está rodando!');
});

// Rota manual para servir o arquivo swagger.json (Resolve o Cannot GET)
app.get('/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger.json'));
});

// 2. Iniciar o Servidor
async function startServer() {
  // Conecta e sincroniza os modelos com o banco de dados
  await connectDB();
  
  // Isso irá criar a tabela 'Orders' se ela não existir.
  // IMPORTANTE: use `force: true` APENAS em desenvolvimento, pois ele DELETA a tabela e recria.
  await sequelize.sync(); 
  console.log('✅ Modelos sincronizados com o banco de dados.');

  app.listen(PORT, () => {
    console.log(`⚡ Servidor Express rodando em: http://localhost:${PORT}`);
  });
}

startServer();