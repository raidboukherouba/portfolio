const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb+srv://dbPortfolio:dbPortfolio@raidboukherouba.e828e.mongodb.net/?retryWrites=true&w=majority&appName=raidboukherouba');
  //mongodb://mongo:27017/portfolioDB
  console.log('✅ Connected to MongoDB');
}

module.exports = connectDB;
