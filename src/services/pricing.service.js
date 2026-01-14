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

// ================= ADD-ON LOGIC =================
let addonsTotal = 0;

if (item.addons && item.addons.length > 0) {

  // 1️⃣ Mandatory add-ons (always included)
  item.addons.forEach((addon) => {
    if (addon.is_mandatory) {
      addonsTotal += addon.price;
    }
  });

  // 2️⃣ Optional selected add-ons
  if (item.selected_addons && item.selected_addons.length > 0) {
    item.selected_addons.forEach((selectedName) => {
      const addon = item.addons.find(
        (a) => a.name === selectedName && !a.is_mandatory
      );

      if (!addon) {
        throw new Error(`Invalid add-on selected: ${selectedName}`);
      }

      addonsTotal += addon.price;
    });
  }
}

// ================= SUBTOTAL =================
const subTotal = priceAfterDiscount + addonsTotal;

// ================= TAX INHERITANCE =================
let tax = 0;
const category = await Category.findById(item.category);

if (category && category.tax_applicable) {
  tax = (subTotal * category.tax_percentage) / 100;
}

// ================= FINAL PRICE =================
const finalPrice = subTotal + tax;

return {
  pricing_type: item.pricing_type,
  base_price: basePrice,
  discount,
  addons_total: addonsTotal,
  tax,
  final_price: finalPrice
};

};
