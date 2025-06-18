const app = require('./app');  // Import the app from app.js
const mongoose = require('mongoose');
require('dotenv').config();

// in dev replace mongodb://127.0.0.1:27017/portfolioDB
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dbPortfolio:dbPortfolio@raidboukherouba.e828e.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=raidboukherouba')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
