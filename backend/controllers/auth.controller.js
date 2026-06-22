const User = require('../models/User');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const { sendEmail } = require('../utils/emailService');

const googleClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;

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
// Accepts a Google ID token ("credential") from Google Identity Services,
// verifies it server-side, then logs in or registers the user.
const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;
    console.log('[googleAuth] hit /api/v1/auth/google | credential present:', !!credential, '| client configured:', !!googleClient);

    if (!credential) {
      return res.status(400).json({ success: false, message: 'Missing Google credential' });
    }

    if (!googleClient) {
      console.error('[googleAuth] GOOGLE_CLIENT_ID env not set on server');
      return res.status(500).json({ success: false, message: 'Google login is not configured on the server' });
    }

    // Verify the ID token with Google and ensure it was issued for this app
    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
      console.log('[googleAuth] token verified for:', payload.email, '| email_verified:', payload.email_verified);
    } catch (err) {
      console.error('[googleAuth] verifyIdToken failed:', err.message);
      return res.status(401).json({ success: false, message: 'Invalid Google credential' });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || email.split('@')[0];
    const profilePicture = payload.picture || '';

    if (!payload.email_verified) {
      return res.status(401).json({ success: false, message: 'Google account email is not verified' });
    }

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      console.log('[googleAuth] creating new user for:', email);
      user = await User.create({ name, email, googleId, profilePicture, isVerified: true });
    } else if (!user.googleId) {
      console.log('[googleAuth] linking googleId to existing user:', email);
      user.googleId = googleId;
      if (!user.profilePicture && profilePicture) user.profilePicture = profilePicture;
      await user.save({ validateBeforeSave: false });
    }

    const token = user.getSignedJwtToken();
    console.log('[googleAuth] success, issuing token for:', user.email);
    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture },
    });
  } catch (error) {
    console.error('[googleAuth] unexpected error:', error.message);
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
