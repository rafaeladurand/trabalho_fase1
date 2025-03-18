const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    promotionalPrice: {
      type: Number,
      default: null, 
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null, 
    },
    expirationDate: {
      type: Date,
      default: null, 
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Product', productSchema);
