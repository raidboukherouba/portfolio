const app = require('./app');  // Import the app from app.js
const mongoose = require('mongoose');
require('dotenv').config();

// in dev replace mongodb://127.0.0.1:27017/portfolioDB
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/portfolioDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
