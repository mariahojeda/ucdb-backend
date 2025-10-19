const mongoose = require('mongoose');

function connectToDatabase() {
  // ✅ STRING DE CONEXÃO ATUALIZADA
  const MONGODB_URI = 'mongodb+srv://mariahojeda_db_user:eW76iraGTo7semYR@cluster0.onmwolw.mongodb.net/clientesdb';
  
  console.log('🔗 Conectando ao MongoDB Atlas...');

  // ✅ CONFIGURAÇÕES ATUALIZADAS - Removendo opções obsoletas
  const mongooseOptions = {
    serverSelectionTimeoutMS: 30000,  // ✅ 30 segundos para seleção do servidor
    socketTimeoutMS: 45000,           // ✅ 45 segundos para timeout do socket
    maxPoolSize: 10,                  // ✅ Número máximo de conexões
    minPoolSize: 1,                   // ✅ Número mínimo de conexões
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
      console.log('   - Credenciais de acesso');
      process.exit(1);
    });

  // ✅ EVENTOS DE CONEXÃO PARA DEBUG
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

  // ✅ TRATAMENTO PARA SHUTDOWN GRACEFUL
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