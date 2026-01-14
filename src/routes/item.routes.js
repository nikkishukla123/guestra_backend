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

