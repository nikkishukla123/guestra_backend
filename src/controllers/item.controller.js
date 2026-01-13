const Item = require('../models/Item.model');

// CREATE item
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all items (only active)
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ is_active: true }).populate('category');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
