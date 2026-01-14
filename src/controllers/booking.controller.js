const Item = require('../models/Item.model');
const Booking = require('../models/Booking.model');

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const itemId = req.params.itemId;

    const item = await Item.findById(itemId);
    if (!item || !item.is_bookable) {
      return res.status(400).json({ error: 'Item is not bookable' });
    }

    // find bookings for that date
    const bookings = await Booking.find({ item: itemId, date });

    const bookedSlots = bookings.map(
      b => `${b.start}-${b.end}`
    );

    const availableSlots = item.availability.slots.filter(
      slot => !bookedSlots.includes(`${slot.start}-${slot.end}`)
    );

    res.json({ availableSlots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// book slot
exports.bookSlot = async (req, res) => {
    try {
      const { date, start, end } = req.body;
      const itemId = req.params.itemId;
  
      // check if slot already booked
      const conflict = await Booking.findOne({
        item: itemId,
        date,
        start,
        end
      });
  
      if (conflict) {
        return res.status(400).json({ error: 'Slot already booked' });
      }
  
      const booking = await Booking.create({
        item: itemId,
        date,
        start,
        end
      });
  
      res.status(201).json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  