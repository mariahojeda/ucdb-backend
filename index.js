require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./database');

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Conexão com Database
connectToDatabase();

app.use('/clientes', clienteRoutes);

// Rota básica de teste
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API de Clientes funcionando!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      clientes: 'GET /clientes',
      health: 'GET /health'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API rodando corretamente',
    timestamp: new Date().toLocaleString('pt-BR'),
    database: 'MongoDB Atlas'
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 API DE CLIENTES - INICIADA COM SUCESSO!');
  console.log('='.repeat(50));
  console.log(`📊 Servidor rodando na porta: ${PORT}`);
  console.log(`❤️  Health Check disponível`);
  console.log('='.repeat(50));
  console.log('⏰', new Date().toLocaleString('pt-BR'));
  console.log('='.repeat(50) + '\n');
});