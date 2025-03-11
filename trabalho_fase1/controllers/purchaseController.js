const Product = require('../models/product');
const Purchase = require('../models/purchase');
const User = require('../models/user');

async function createPurchase(req, res) {
  try {
    const { userId, productId, price } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    const newPurchase = new Purchase({ user: userId, product: productId, price });
    await newPurchase.save();
    
    user.purchases.push(newPurchase._id);
    await user.save();
    
    res.status(201).json({ message: 'Compra registrada com sucesso.', purchase: newPurchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

async function getProductPurchases(req, res) {
  try {
    const purchases = await Purchase.find({ product: req.params.productId }).populate('user');
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}


async function getAllPurchases(req, res) {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

async function getPurchase(req, res) {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada.' });
    }
    res.json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

async function deletePurchase(req, res) {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada.' });
    }
    res.json({ message: 'Compra excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = { createPurchase, getAllPurchases, getPurchase, deletePurchase, getProductPurchases };
