const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://mongo:27017/portfolioDB');
  console.log('✅ Connected to MongoDB');
}

module.exports = connectDB;
