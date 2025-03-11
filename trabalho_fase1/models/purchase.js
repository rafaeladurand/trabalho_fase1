const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, 
    products: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    }], 
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,  // A data de compra será a data atual por padrão
    },
  },
  { timestamps: true }  // Para registrar as datas de criação e atualização
);

module.exports = mongoose.model('Purchase', purchaseSchema);
