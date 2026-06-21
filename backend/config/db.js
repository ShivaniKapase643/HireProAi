const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri || uri.includes('localhost:27017')) {
      // Use MongoDB Memory Server for local development
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      
      await mongoose.connect(memUri);
      logger.info('MongoDB In-Memory Server Connected (Development Mode)');
      logger.info('Note: Data will reset on server restart. Set MONGODB_URI in .env for persistence.');
      return;
    }

    await mongoose.connect(uri, {
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
