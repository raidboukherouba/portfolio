const mongoose = require('mongoose');
const Project = require('../models/Project');
const connectDB = require('../config/db');

const projects = [
  {
    title: 'Personal Portfolio',
    description: 'A developer-focused portfolio built to showcase my programming skills, software projects, and open-source contributions. Designed with a clean, responsive layout and packed with detailed project overviews to leave a lasting impression.',
    technologies: ['Express', 'React', 'MongoDB', 'Tailwind CSS', 'JWT'],
    githubUrl: 'https://github.com/raidboukherouba/portfolio',
    liveUrl: 'https://raidboukherouba.dev',
    imageUrl: 'https://img.freepik.com/premium-vector/gradient-responsive-website-design_23-2149496034.jpg?w=1380'
  },
  {
    title: 'Integrated University Laboratory Management System',
    description: 'An information system designed to streamline research lab operations and offer decision-makers — such as lab directors, faculty, and university leadership — real-time access to data on resources and activities. Built to ensure accurate, up-to-date insights into lab performance and usage.',
    technologies: ['Express', 'React', 'PostgreSQL', 'Tailwind CSS', 'Sequelize'],
    githubUrl: 'https://github.com/raidboukherouba/lab-flow',
    liveUrl: 'https://raidboukherouba.dev',
    imageUrl: 'https://img.freepik.com/free-vector/dark-laboratory-room-with-glassware-table-illustration_1262-16283.jpg?t=st=1744958027~exp=1744961627~hmac=93a47806127cea83241cb9ec5c8ec0c7f636f43db6380b88ebe1eb18a995220f&w=1800'
  },
  {
    title: 'Algerian Arabic Dialect Sentiment Analysis Web App',
    description: 'A full-stack web application for sentiment analysis in Algerian Arabic. This project integrates multiple machine learning models — from traditional ML to deep learning and ensemble techniques — to deliver robust sentiment predictions. (All models were fine-tuned by me as part of this initiative.)',
    technologies: ['Express', 'React', 'PostgreSQL', 'Tailwind CSS', 'Sequelize'],
    githubUrl: 'https://github.com/raidboukherouba/dziriSentiment',
    liveUrl: 'https://raidboukherouba.dev',
    imageUrl: 'https://img.freepik.com/free-photo/top-view-arrangement-with-different-feelings_23-2148860308.jpg?t=st=1744957962~exp=1744961562~hmac=adc20bc741eb1459227927ec121536b49ced19012238528759b50f257b66436b&w=900'
  }
];

async function projectSeeder() {
  try {
    await connectDB();

    await Project.deleteMany();
    await Project.insertMany(projects);

    console.log('✅ Projects seeded!');
  } catch (err) {
    console.error('❌ Failed to seed projects:', err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = projectSeeder;

if (require.main === module) {
  projectSeeder();
}
