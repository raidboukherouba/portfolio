const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  category: String, // e.g., "Frontend", "Backend"
  logo: {
    type: String,
    required: false // You can make it required if every skill must have a logo
  }
});

module.exports = mongoose.model('Skill', skillSchema);
