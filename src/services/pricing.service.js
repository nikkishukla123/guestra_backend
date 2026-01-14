const Category = require('../models/Category.model');

exports.calculateItemPrice = async (item) => {
  let basePrice = 0;
  let discount = 0;

  // 1️⃣ Pricing logic
  if (item.pricing_type === 'STATIC') {
    basePrice = item.base_price;
  }

  if (item.pricing_type === 'COMPLIMENTARY') {
    basePrice = 0;
  }

  if (item.pricing_type === 'DISCOUNTED') {
    basePrice = item.base_price;

    if (item.discount_type === 'FLAT') {
      discount = item.discount_value;
    }

    if (item.discount_type === 'PERCENT') {
      discount = (item.base_price * item.discount_value) / 100;
    }

    if (discount > basePrice) {
      discount = basePrice;
    }
  }

// TIERED PRICING 
if (item.pricing_type === 'TIERED') {
    const duration = item.requested_duration;

    const sortedTiers = item.pricing_tiers.sort(
      (a, b) => a.upto - b.upto
    );

    const matchedTier = sortedTiers.find(
      (tier) => duration <= tier.upto
    );

    if (!matchedTier) {
      throw new Error('No pricing tier available for given duration');
    }

    basePrice = matchedTier.price;
  }




  let priceAfterDiscount = basePrice - discount;

  // 2️⃣ Tax inheritance (from category)
  let tax = 0;
  const category = await Category.findById(item.category);

  if (category && category.tax_applicable) {
    tax = (priceAfterDiscount * category.tax_percentage) / 100;
  }

  // 3️⃣ Final price
  const finalPrice = priceAfterDiscount + tax;

  return {
    pricing_type: item.pricing_type,
    base_price: basePrice,
    discount,
    tax,
    final_price: finalPrice,
  };
};
