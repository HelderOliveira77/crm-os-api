// server.js 

// Apenas carrega o dotenv se as variáveis principais não existirem no sistema
if (!process.env.DB_PASS) {
  require('dotenv').config();
}

const authRoutes = require('./src/routes/auth'); // NOVO: Rotas de autenticação
const orderRoutes = require('./src/routes/orders'); 
const express = require('express');

const { sequelize, connectDB } = require('./src/config/database');
const Order = require('./src/models/Order'); 
const User = require('./src/models/User'); // NOVO: Modelo do utilizador (importante para o sequelize.sync)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Forma simples

const path = require('path'); // <--- A LINHA DO 'path'

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors'); // [NOVO] Importar cors

const userRoutes = require('./src/routes/users');





// 1. Configurar Rotas

// [NOVO] Configurar CORS para aceitar pedidos do frontend
app.use(cors({
  origin: 'http://localhost:5173', // Permite apenas a sua porta frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


// Middleware para processar JSON nas requisições
app.use(express.json());
//app.use('/api/os', orderRoutes);


app.use('/auth', authRoutes);    // <--- AGORA ESPERA /auth/register
//app.use('/orders', orderRoutes); // <--- AGORA ESPERA /orders
app.use('/api/os', orderRoutes); // <--- A ÚNICA ROTA CORRETA PARA O ORDERS.JS

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('API de Gestão de Ordens de Serviço está rodando!');
});

// Rota manual para servir o arquivo swagger.json (Resolve o Cannot GET)
app.get('/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger.json'));
});

app.use('/api/users', userRoutes);

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