const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/auth');
// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'https://med-raid-elislam-boukherouba.netlify.app', // ✅ allow only your frontend origin: 'http://localhost:3000',
  credentials: true // ✅ allow cookies/auth headers
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', require('./routes/profile'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/diplomas', require('./routes/diplomas'));

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
