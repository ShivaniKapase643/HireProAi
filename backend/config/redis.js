const { createClient } = require('redis');
const logger = require('./logger');

let redisClient;

const connectRedis = async () => {
  try {
    if (!process.env.REDIS_URL) {
      logger.warn('No REDIS_URL configured, running without cache');
      return;
    }
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err) => logger.warn('Redis unavailable, running without cache'));
    await redisClient.connect();
    logger.info('Redis Connected');
  } catch (error) {
    logger.warn('Redis connection failed, running without cache');
    redisClient = null;
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
