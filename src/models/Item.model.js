const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    // item belongs to a category OR subcategory (abhi sirf category)
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    // pricing config
    pricing_type: {
      type: String,
      enum: ['STATIC', 'COMPLIMENTARY', 'DISCOUNTED'],
      required: true,
    },

    base_price: {
      type: Number,
    },

    discount_value: {
      type: Number,
    },

    discount_type: {
      type: String,
      enum: ['FLAT', 'PERCENT'],
    },
  },
  { timestamps: true }
);

// basic pricing validation
itemSchema.pre('save', function () {
  if (this.pricing_type === 'STATIC' && this.base_price === undefined) {
    throw new Error('base_price is required for STATIC pricing');
  }

  if (this.pricing_type === 'COMPLIMENTARY' && this.base_price) {
    throw new Error('Complimentary item cannot have a base price');
  }

  if (this.pricing_type === 'DISCOUNTED') {
    if (this.base_price === undefined || this.discount_value === undefined) {
      throw new Error('Discounted pricing requires base_price and discount_value');
    }
  }
});

module.exports = mongoose.model('Item', itemSchema);
