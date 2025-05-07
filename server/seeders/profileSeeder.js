const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const connectDB = require('../config/db');

const profile = {
  firstName: 'Mohammed Raid Elislam',
  lastName: 'Boukherouba',
  profession: 'Full Stack Developer',
  avatar: 'https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  bio: '👋 Hi! I’m Raid, a Computer Science graduate from 8 mai 1945 University in Guelma with a Bachelor’s in Information Systems and a Master’s in Information and Communication Systems and Technologies. I’m passionate about web development and actively pursuing a career as a Full Stack Developer. 💻 My stack revolves around the JavaScript ecosystem, both frontend and backend — using tools like React, Node.js, and Express. I leverage Docker for containerization and AWS for scalable cloud deployments. 🚀 I aim to build impactful, high-performance apps and grow continuously while contributing to meaningful tech projects.',
  age: 23,
  location: {
    city: 'Guelma',
    country: 'Algeria'
  },
  socialLinks: {
    github: 'https://github.com/raidboukherouba',
    linkedin: 'https://linkedin.com/in/raidboukherouba',
    twitter: 'https://twitter.com/raidboukherouba',
    facebook: 'https://facebook.com/raidboukherouba.dev',
    website: 'https://raidboukherouba.dev'
  },
  cv: "https://cv.com/raidboukherouba"
};

async function profileSeeder() {
  try {
    await connectDB();

    await Profile.deleteMany(); // Keep only one profile
    await Profile.create(profile);

    console.log('👤 Profile seeded!');
  } catch (err) {
    console.error('❌ Failed to seed profile:', err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = profileSeeder;

if (require.main === module) {
  profileSeeder();
}
