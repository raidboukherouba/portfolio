const mongoose = require('mongoose');
const Certification = require('../models/Certification');
const connectDB = require('../config/db');

const certifications = [
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training and Certification',
    date: new Date('2023-01-15'),
    description: 'This course is for individuals who seek an overall understanding of the Amazon Web Services (AWS) Cloud, independent of specific technical roles. You will learn about AWS Cloud concepts, AWS services, security, architecture, pricing, and support to build your AWS Cloud knowledge. This course also helps you prepare for the AWS Certified Cloud Practitioner exam.',
    credentialUrl: 'https://explore.skillbuilder.aws/learn/courses/134/aws-cloud-practitioner-essentials/lessons/136404/aws-cloud-practitioner-essentials'
  },
  {
    title: 'Docker Certified Associate (DCA)',
    issuer: 'Coursera',
    date: new Date('2023-05-30'),
    description: 'Master Docker’s containerization technology. Learn Docker architecture and its function within the DevOps lifecycle. Build images, containers, swarms, volumes, networks, client-server authentication, security bundles, and more to prepare for the DCA exam.',
    credentialUrl: 'https://www.coursera.org/specializations/docker-certified-associate-dca-course'
  }
];

async function certificationSeeder() {
  try {
    await connectDB();

    await Certification.deleteMany();
    await Certification.insertMany(certifications);

    console.log('📜 Certifications seeded!');
  } catch (err) {
    console.error('❌ Failed to seed certifications:', err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = certificationSeeder;

if (require.main === module) {
  certificationSeeder();
}
