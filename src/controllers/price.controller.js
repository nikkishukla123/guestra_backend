const Item = require('../models/Item.model');
const { calculateItemPrice } = require('../services/pricing.service');

exports.getItemPrice = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item || !item.is_active) {
      return res.status(404).json({ error: 'Item not found or inactive' });
    }

    // ✅ duration
    const duration = Number(req.query.duration);

    // ✅ validation
    if (item.pricing_type === 'TIERED' && !duration) {
      return res
        .status(400)
        .json({ error: 'duration is required for tiered pricing' });
    }

    item.requested_duration = duration;
    
    const priceDetails = await calculateItemPrice(item);

    res.json({
      item_id: item._id,
      ...priceDetails,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

