const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategories
} = require('../controllers/category.controller');

const { validateBody } = require('../middlewares/validate');
const { createCategorySchema } = require('../validations/category.validation');

router.post(
  '/',
  validateBody(createCategorySchema),
  createCategory
);

router.get('/', getCategories);

module.exports = router;

