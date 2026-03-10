/**
 * Ponto de entrada da API de Pedidos
 * Endpoints: POST/GET/PUT/DELETE /order e GET /order/list
 */
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const orderRoutes = require('./routes/orderRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rotas
app.use('/', orderRoutes);

// Health check (opcional)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Tratamento de erros (deve ser após as rotas)
app.use(errorHandler);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

// Conectar ao MongoDB e iniciar servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao iniciar:', err);
    process.exit(1);
  });
