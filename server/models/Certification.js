const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: String,
  date: { type: Date, required: true },
  description: String,
  credentialUrl: String // optional URL to the actual certificate
}, { 
  timestamps: true,
  collection: 'certifications'
 });

module.exports = mongoose.model('Certification', certificationSchema);
