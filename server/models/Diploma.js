const mongoose = require('mongoose');

const diplomaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: String,
  field: String,
  date: { type: Date, required: true },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Diploma', diplomaSchema);
