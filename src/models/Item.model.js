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
      enum: ['STATIC', 'COMPLIMENTARY', 'DISCOUNTED' ,'TIERED'],
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
    pricing_tiers: [
      {
        upto: {
          type: Number, // hours
        },
        price: {
          type: Number,
        }
      }
    ],

    is_bookable: {
      type: Boolean,
      default: false
    },
    
    availability: {
      days: {
        type: [String], // ["Mon", "Tue", "Wed"]
        default: []
      },
      slots: [
        {
          start: String, // "10:00"
          end: String    // "11:00"
        }
      ]
    },
    addons: [
      {
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        is_mandatory: {
          type: Boolean,
          default: false
        }
      }
    ]
    
    
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
// tiered logic
itemSchema.pre('save', function () {
  if (this.pricing_type === 'TIERED') {
    if (!this.pricing_tiers || this.pricing_tiers.length === 0) {
      throw new Error('pricing_tiers required for TIERED pricing');
    }

    const sorted = this.pricing_tiers.sort((a, b) => a.upto - b.upto);

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].upto <= sorted[i - 1].upto) {
        throw new Error('Tier ranges must not overlap');
      }
    }
  }
});


module.exports = mongoose.model('Item', itemSchema);
