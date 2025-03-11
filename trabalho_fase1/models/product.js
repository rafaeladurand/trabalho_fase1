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
      default: null,  // Se não houver preço promocional, será nulo
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,  // Se não houver descrição, será nulo
    },
    expirationDate: {
      type: Date,
      default: null,  // Se não houver data de validade, será nulo
    },
  },
  { timestamps: true }  // Para registrar as datas de criação e atualização
);

module.exports = mongoose.model('Product', productSchema);
