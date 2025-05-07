const mongoose = require('mongoose');
const Diploma = require('../models/Diploma');
const connectDB = require('../config/db'); // centralized connection

const diplomas = [
  {
    title: 'Bachelor in Information System',
    institution: 'University of 8 mai 1945 Guelma',
    field: 'computer science',
    date: new Date('2022-06-15'),
    description: 'Graduated with honors.'
  },
  {
    title: 'Master in Information and Communication Systems and Technologies',
    institution: 'University of 8 mai 1945 Guelma',
    field: 'computer science',
    date: new Date('2024-07-01'),
    description: 'Graduated with honors.'
  }
];

async function diplomaSeeder() {
  try {
    await connectDB(); // use from /config/db.js

    await Diploma.deleteMany();
    await Diploma.insertMany(diplomas);

    console.log('🎓 Diplomas seeded!');
  } catch (err) {
    console.error('❌ Failed to seed diplomas:', err);
  } finally {
    await mongoose.disconnect();
  }
}

// ✅ Export it for use in allSeeders.js
module.exports = diplomaSeeder;

// 👇 Optional: run directly from CLI if called directly
if (require.main === module) {
  diplomaSeeder();
}
