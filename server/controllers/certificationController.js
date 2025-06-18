const Certification = require('../models/Certification');

exports.getAllCertifications = async (req, res) => {
  const certifications = await Certification.find().sort({ date: -1 });
  res.json(certifications);
};

exports.getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(certification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCertification = async (req, res) => {
  const newCert = new Certification(req.body);
  const saved = await newCert.save();
  res.status(201).json(saved);
};

exports.updateCertification = async (req, res) => {
  const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCertification = async (req, res) => {
  await Certification.findByIdAndDelete(req.params.id);
  res.json({ message: 'Certification deleted' });
};
