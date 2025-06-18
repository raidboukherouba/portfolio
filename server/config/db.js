const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  //mongodb://mongo:27017/portfolioDB
  //mongodb+srv://dbPortfolio:dbPortfolio@raidboukherouba.e828e.mongodb.net/?retryWrites=true&w=majority&appName=raidboukherouba
  console.log('✅ Connected to MongoDB');
}

module.exports = connectDB;
