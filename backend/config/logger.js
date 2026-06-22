const winston = require('winston');

// Production-friendly logger — only logs to console (works on Render, Heroku, Vercel, etc.)
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'production'
        ? winston.format.simple()
        : winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
  // Don't crash on logging errors
  exitOnError: false,
});

module.exports = logger;
