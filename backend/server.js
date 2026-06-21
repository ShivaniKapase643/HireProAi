const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import configurations
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const logger = require('./config/logger');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const interviewRoutes = require('./routes/interview.routes');
const resumeRoutes = require('./routes/resume.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const notificationRoutes = require('./routes/notification.routes');
const adminRoutes = require('./routes/admin.routes');
const tpoRoutes = require('./routes/tpo.routes');
const recruiterRoutes = require('./routes/recruiter.routes');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { rateLimiter } = require('./middleware/rateLimiter');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Socket.io setup for real-time features
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      process.env.CLIENT_URL,
    ].filter(Boolean),
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Make io accessible in routes
app.set('io', io);

// ===== MIDDLEWARE =====
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(rateLimiter);

// ===== API ROUTES =====
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/interviews', interviewRoutes);
app.use('/api/v1/resumes', resumeRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/tpo', tpoRoutes);
app.use('/api/v1/recruiter', recruiterRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// ===== SOCKET.IO EVENTS =====
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join-room', (userId) => {
    socket.join(userId);
    logger.info(`User ${userId} joined room`);
  });

  socket.on('interview-message', (data) => {
    io.to(data.userId).emit('interview-response', data);
  });

  socket.on('notification', (data) => {
    io.to(data.userId).emit('new-notification', data);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// ===== ERROR HANDLING =====
app.use(errorHandler);

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    
    server.listen(PORT, () => {
      logger.info(`SmartHire AI Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => process.exit(0));
});

module.exports = { app, io };
