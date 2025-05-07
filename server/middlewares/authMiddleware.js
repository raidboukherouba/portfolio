const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

if (!JWT_SECRET && NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production environment');
}

module.exports = async (req, res, next) => {
  // 1. Extract token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Authorization header missing or invalid',
      code: 'MISSING_AUTH_HEADER'
    });
  }

  const token = authHeader.split(' ')[1].trim();
  
  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
      code: 'NO_TOKEN_PROVIDED'
    });
  }

  // 2. Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET || 'development-secret');
    
    // 3. Check token expiration separately for better error handling
    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({
        message: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }

    // 4. Get user and attach to request
    const user = await User.findById(decoded.id).select('-password -refreshToken');
    
    if (!user) {
      return res.status(401).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // 5. Attach user and token to request
    req.user = user;
    req.token = token;
    
    next();
  } catch (err) {
    // 6. Handle specific JWT errors
    let message = 'Invalid token';
    let code = 'INVALID_TOKEN';
    
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired';
      code = 'TOKEN_EXPIRED';
    } else if (err.name === 'JsonWebTokenError') {
      message = 'Malformed token';
      code = 'MALFORMED_TOKEN';
    }

    return res.status(401).json({ 
      message,
      code,
      hint: NODE_ENV === 'development' ? err.message : undefined
    });
  }
};