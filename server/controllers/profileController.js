const Profile = require('../models/Profile');

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (profile) {
      // Update existing
      profile = await Profile.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
      return res.json(profile);
    }

    // Create new
    const newProfile = new Profile(req.body);
    const saved = await newProfile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save profile', error: err.message });
  }
};
