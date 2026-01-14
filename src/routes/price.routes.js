const express = require('express');
const router = express.Router();

const { getItemPrice } = require('../controllers/price.controller');

router.get('/:id/price', getItemPrice);

module.exports = router;
