/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - pricing_type
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza
 *               category:
 *                 type: string
 *                 example: 6966903e22e037fc3ad86b0f
 *               pricing_type:
 *                 type: string
 *                 example: STATIC
 *               base_price:
 *                 type: number
 *                 example: 200
 *               addons:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Extra Cheese
 *                     price:
 *                       type: number
 *                       example: 40
 *                     is_mandatory:
 *                       type: boolean
 *                       example: false
 *     responses:
 *       201:
 *         description: Item created successfully
 */


/**
 * @swagger
 * /items/{id}/price:
 *   get:
 *     summary: Get final calculated price of an item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: duration
 *         schema:
 *           type: number
 *         description: Required for tiered pricing
 *       - in: query
 *         name: addons
 *         schema:
 *           type: string
 *         description: Comma separated add-on names
 *     responses:
 *       200:
 *         description: Price calculation breakdown
 */






const express = require('express');
const router = express.Router();

const {
  createItem,
  getItems
} = require('../controllers/item.controller');

const { validateBody } = require('../middlewares/validate');
const { createItemSchema } = require('../validations/item.validation');

router.post(
  '/',
  validateBody(createItemSchema),
  createItem
);

router.get('/', getItems);

module.exports = router;

