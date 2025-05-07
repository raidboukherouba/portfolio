const Diploma = require('../models/Diploma');

exports.getAllDiplomas = async (req, res) => {
  const diplomas = await Diploma.find().sort({ date: -1 });
  res.json(diplomas);
};

exports.getDiplomaById = async (req, res) => {
  try {
    const diploma = await Diploma.findById(req.params.id);
    if (!diploma) {
      return res.status(404).json({ message: 'Diploma not found' });
    }
    res.json(diploma);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDiploma = async (req, res) => {
  const newDiploma = new Diploma(req.body);
  const saved = await newDiploma.save();
  res.status(201).json(saved);
};

exports.updateDiploma = async (req, res) => {
  const updated = await Diploma.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteDiploma = async (req, res) => {
  await Diploma.findByIdAndDelete(req.params.id);
  res.json({ message: 'Diploma deleted' });
};
