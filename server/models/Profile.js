const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  profession: String,
  avatar: String, // URL or file path
  bio: String,
  age: Number,
  location: {
    city: String,
    country: String,
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    facebook: String,
    website: String
  },
  cv: String
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
