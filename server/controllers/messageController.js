const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

exports.getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { email, name, startDate, endDate, read } = req.query;

    const searchQuery = {};

    if (email) {
      searchQuery.email = { $regex: email, $options: 'i' };
    }

    if (name) {
      searchQuery.name = { $regex: name, $options: 'i' };
    }

    if (read !== undefined) {
      if (read === 'true' || read === 'false') {
        searchQuery.read = read === 'true';
      }
    }

    if (startDate || endDate) {
      searchQuery.createdAt = {};
      if (startDate) {
        searchQuery.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        searchQuery.createdAt.$lte = new Date(endDate);
      }
    }

    const total = await Message.countDocuments(searchQuery);
    const messages = await Message.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      messages,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.sendMessage = async (req, res) => {
  const newMsg = new Message(req.body);
  const saved = await newMsg.save();
  res.status(201).json(saved);
};

exports.markAsRead = async (req, res) => {
  const updated = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(updated);
};

exports.deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: 'Message deleted' });
};
