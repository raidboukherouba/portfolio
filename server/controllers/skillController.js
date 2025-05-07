const Skill = require('../models/Skill');

exports.getAllSkills = async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
};

exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSkill = async (req, res) => {
  const newSkill = new Skill(req.body);
  const saved = await newSkill.save();
  res.status(201).json(saved);
};

exports.updateSkill = async (req, res) => {
  const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Skill deleted' });
};
