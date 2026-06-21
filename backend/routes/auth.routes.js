const express = require('express');
const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword, verifyOTP, googleAuth, refreshToken } = require('../controllers/auth.controller');
const { registerValidation, loginValidation, validate } = require('../middleware/validator');
const { authLimiter } = require('../middleware/rateLimiter');
const { protect } = require('../middleware/auth');

router.post('/register', authLimiter, registerValidation, validate, register);
router.post('/login', authLimiter, loginValidation, validate, login);
router.post('/logout', protect, logout);
router.post('/forgot-password', authLimiter, forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post('/verify-otp', verifyOTP);
router.post('/google', googleAuth);
router.post('/refresh-token', refreshToken);

module.exports = router;
