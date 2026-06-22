const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    // PRODUCTION: must have a real MongoDB URI
    if (process.env.NODE_ENV === 'production') {
      if (!uri) {
        logger.error('FATAL: MONGODB_URI is required in production');
        logger.warn('Server will start but database operations will fail. Set MONGODB_URI in Render dashboard.');
        return;
      }
      await mongoose.connect(uri, {
        maxPoolSize: 50,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      logger.info(`MongoDB Connected: ${mongoose.connection.host}`);
      return;
    }

    // DEVELOPMENT: use real DB if URI is set
    if (uri && !uri.includes('localhost:27017')) {
      await mongoose.connect(uri);
      logger.info(`MongoDB Connected (Dev): ${mongoose.connection.host}`);
      return;
    }

    // DEVELOPMENT fallback: in-memory MongoDB (only in dev)
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      logger.info('MongoDB In-Memory Server Connected (Dev Mode)');
    } catch (e) {
      logger.warn('In-memory MongoDB not available, continuing without DB');
    }
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    logger.warn('Server will start but database operations will fail');
  }
};

module.exports = connectDB;
