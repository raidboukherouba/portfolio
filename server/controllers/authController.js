const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');
const sendEmail = require('../utils/sendEmail'); // You must create this utility

const JWT_SECRET = process.env.JWT_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';

const refreshTokens = new Set();

exports.register = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email already in use' });

  const user = await User.create({ email, password });

  const accessToken = generateAccessToken(user._id, rememberMe);
  const refreshToken = generateRefreshToken(user._id, rememberMe);
  refreshTokens.add(refreshToken);

  res.status(201).json({ accessToken, refreshToken });
};

exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user._id, rememberMe);
  const refreshToken = generateRefreshToken(user._id, rememberMe);
  refreshTokens.add(refreshToken);

  res.json({ accessToken, refreshToken });
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.has(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const newAccessToken = generateAccessToken(decoded.id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Token expired or invalid' });
  }
};

exports.logout = (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens.delete(refreshToken);
  res.json({ message: 'Logged out successfully' });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:5173/reset-password?token=${resetToken}`;
  
  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Reset',
      text: `Click this link to reset your password: ${resetURL}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f7f7f7; border-radius: 8px;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p style="color: #555;">
            We received a request to reset your password. If you made this request, please click the button below:
          </p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetURL}" style="padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Password
            </a>
          </p>
          <p style="color: #555;">
            If you did not request a password reset, you can safely ignore this email.
          </p>
          <p style="font-size: 12px; color: #aaa;">This link will expire in 15 minutes.</p>
        </div>
      `
    });
    res.json({ message: 'Reset email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: 'Failed to send reset email' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Token invalid or expired' });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password has been reset' });
};
