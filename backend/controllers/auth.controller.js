const User = require('../models/User');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');

// @desc    Register user (FR-1.1)
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, phone, role: role || 'student', isVerified: true });

    const token = user.getSignedJwtToken();
    res.status(201).json({ success: true, token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user (FR-1.2)
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    user.lastActivity = Date.now();
    await user.save({ validateBeforeSave: false });

    const token = user.getSignedJwtToken();
    res.status(200).json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout (FR-1.2)
const logout = async (req, res) => {
  res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// @desc    Forgot password (FR-1.5)
const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user with that email' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'SmartHire AI - Password Reset',
      text: `Reset your password: ${resetUrl}`,
    });

    res.status(200).json({ success: true, message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password (FR-1.5)
const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP (FR-1.1)
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp.code !== otp || user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Account verified successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth (FR-1.1)
const googleAuth = async (req, res, next) => {
  try {
    const { googleId, email, name, profilePicture } = req.body;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = await User.create({ name, email, googleId, profilePicture, isVerified: true });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const user = req.user;
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, forgotPassword, resetPassword, verifyOTP, googleAuth, refreshToken };
