const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Check if session is expired (NFR-13.4.6)
    if (req.user.lastActivity) {
      const inactivityLimit = 30 * 60 * 1000; // 30 minutes
      if (Date.now() - req.user.lastActivity > inactivityLimit) {
        return res.status(401).json({ success: false, message: 'Session expired due to inactivity' });
      }
    }

    // Update last activity
    req.user.lastActivity = Date.now();
    await req.user.save({ validateBeforeSave: false });

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
  }
};

// Role-based access control (NFR-13.4.4)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
