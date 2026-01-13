const Category = require('../models/Category.model');

// CREATE category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all categories ,only active
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ is_active: true });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
