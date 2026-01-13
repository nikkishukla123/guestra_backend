const express = require('express');
const router = express.Router();

const {
  createItem,
  getItems,
} = require('../controllers/item.controller');

router.post('/', createItem);
router.get('/', getItems);

module.exports = router;
