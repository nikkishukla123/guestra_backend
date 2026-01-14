//GET AVAILABLE SLOTS
/**
 * @swagger
 * /bookings/{itemId}/slots:
 *   get:
 *     summary: Get available booking slots for an item
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         example: 2026-01-20
 *     responses:
 *       200:
 *         description: List of available slots
 */

//5️⃣ BOOK A SLOT API
/**
 * @swagger
 * /bookings/{itemId}/book:
 *   post:
 *     summary: Book a slot for an item
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - start
 *               - end
 *             properties:
 *               date:
 *                 type: string
 *                 example: 2026-01-20
 *               start:
 *                 type: string
 *                 example: 10:00
 *               end:
 *                 type: string
 *                 example: 11:00
 *     responses:
 *       201:
 *         description: Slot booked successfully
 *       400:
 *         description: Slot already booked
 */



const express = require('express');
const router = express.Router();

const {
  getAvailableSlots,
  bookSlot
} = require('../controllers/booking.controller');

router.get('/:itemId/slots', getAvailableSlots);
router.post('/:itemId/book', bookSlot);

module.exports = router;
