module.exports = {
  port: process.env.PORT || 3000,
  db: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/clientesdb'
  },
  jwtSecret: process.env.JWT_SECRET || 'secret'
};