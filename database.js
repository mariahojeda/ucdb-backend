const mongoose = require('mongoose');

function connectToDatabase() {
  // String de conexão do MongoDB Atlas
  const MONGODB_URI = 'mongodb+srv://mariahojedacodigos_db_user:IW82cOcaUKHnlmJp@cluster0.q1zljcl.mongodb.net/clientesdb';
  
  console.log('🔗 Conectando ao MongoDB Atlas...');
  
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }).then(() => {
    console.log("✅ MONGO DB ATLAS CONECTADO!");
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🏠 Host: ${mongoose.connection.host}`);
  }).catch((err) => {
    console.log(`❌ ERRO NA CONEXÃO: ${err.message}`);
    console.log('💡 Verifique sua conexão com internet');
    process.exit(1);
  });
}

module.exports = connectToDatabase;