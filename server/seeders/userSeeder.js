// src/seeders/userSeeder.js
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');

// Dummy users to seed
const user = {
    email: 'raidboukherouba@gmail.com',
    password: 'admin1234'
}

async function userSeeder() {
  try {
    await connectDB();

    await User.deleteMany();
    // 🔥 Hash the password manually
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await User.insertMany([
      { email: user.email, password: hashedPassword }
    ]);

    console.log('👤 User seeded!');
  } catch (err) {
    console.error('❌ Failed to seed user:', err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = userSeeder;

// Allow running directly: `node src/seeders/userSeeder.js`
if (require.main === module) {
  userSeeder();
}
