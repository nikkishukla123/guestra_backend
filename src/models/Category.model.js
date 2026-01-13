const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    tax_applicable: {
      type: Boolean,
      default: false,
    },
    tax_percentage: {
      type: Number,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// validation: if tax_applicable is true, tax_percentage required
categorySchema.pre('save', function () {
  if (this.tax_applicable && (this.tax_percentage === undefined)) {
    return next(new Error('tax_percentage is required when tax_applicable is true'));
  }
 
});

module.exports = mongoose.model('Category', categorySchema); // collection exported
