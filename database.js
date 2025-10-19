const mongoose = require('mongoose');

function connectToDatabase() {
  // String de conexão do MongoDB Atlas
  const MONGODB_URI = 'mongodb+srv://mariahojedacodigos_db_user:IW82cOcaUKHnlmJp@cluster0.q1zljcl.mongodb.net/clientesdb';
  
  console.log('🔗 Conectando ao MongoDB Atlas...');

  // Configurações otimizadas para Render
  const mongooseOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,  // ✅ 30 segundos para seleção do servidor
    socketTimeoutMS: 45000,           // ✅ 45 segundos para timeout do socket
    bufferCommands: false,            // ✅ Desativa buffering para evitar timeout
    bufferMaxEntries: 0,              // ✅ Desativa buffering de operações
  };

  mongoose.connect(MONGODB_URI, mongooseOptions)
    .then(() => {
      console.log("✅ MONGO DB ATLAS CONECTADO!");
      console.log(`📊 Database: ${mongoose.connection.name}`);
      console.log(`🏠 Host: ${mongoose.connection.host}`);
    })
    .catch((err) => {
      console.log(`❌ ERRO NA CONEXÃO: ${err.message}`);
      console.log('💡 Verifique:');
      console.log('   - Conexão com internet');
      console.log('   - String de conexão do MongoDB');
      console.log('   - Whitelist de IPs no MongoDB Atlas');
      process.exit(1);
    });

  // ✅ Eventos de conexão para melhor debug e tratamento de erros
  mongoose.connection.on('connecting', () => {
    console.log('🔄 Conectando ao MongoDB...');
  });

  mongoose.connection.on('connected', () => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️  Conexão com MongoDB perdida');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔁 Reconectado ao MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.log('❌ Erro na conexão MongoDB:', err.message);
  });

  // ✅ Tratamento para sinais de graceful shutdown
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('🔌 Conexão MongoDB fechada devido ao encerramento da aplicação');
      process.exit(0);
    } catch (err) {
      console.error('❌ Erro ao fechar conexão MongoDB:', err);
      process.exit(1);
    }
  });
}

module.exports = connectToDatabase;