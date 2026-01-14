
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - tax_applicable
 *             properties:
 *               name:
 *                 type: string
 *                 example: Food
 *               tax_applicable:
 *                 type: boolean
 *                 example: true
 *               tax_percentage:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Category created successfully
 */


/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all active categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 */

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

