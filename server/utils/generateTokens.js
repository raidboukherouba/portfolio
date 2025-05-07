const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';

// In your generateTokens.js file
exports.generateAccessToken = (userId, rememberMe = false) => {
  const expiresIn = rememberMe ? '7d' : '15m'; // Longer expiry for "remember me"
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
};

exports.generateRefreshToken = (userId, rememberMe = false) => {
  const expiresIn = rememberMe ? '30d' : '7d'; // Longer expiry for "remember me"
  return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn });
};