const express = require('express');
const router = express.Router();

const {
  getAvailableSlots,
  bookSlot
} = require('../controllers/booking.controller');

router.get('/:itemId/slots', getAvailableSlots);
router.post('/:itemId/book', bookSlot);

module.exports = router;
