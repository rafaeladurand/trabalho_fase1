const Product = require('../models/product');
const Purchase = require('../models/purchase');
const User = require('../models/user');

async function createPurchase(req, res) {
  try {
    const { userId, productIds } = req.body;
    
    // Verifica se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Busca os produtos no banco de dados
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      return res.status(404).json({ message: 'Um ou mais produtos não foram encontrados.' });
    }

    // Calcula o preço total
    const totalPrice = products.reduce((total, product) => {
      return total + (product.promotionalPrice ?? product.currentPrice);
    }, 0);

    // Cria a nova compra
    const newPurchase = new Purchase({ 
      user: userId, 
      products: productIds, 
      price: totalPrice 
    });

    await newPurchase.save();

    // Adiciona a compra ao usuário
    user.purchases.push(newPurchase._id);
    await user.save();

    // Retorna a compra com o preço no JSON de resposta
    res.status(201).json({ 
      message: 'Compra registrada com sucesso.', 
      purchase: {
        id: newPurchase._id,
        user: newPurchase.user,
        products: newPurchase.products,
        price: newPurchase.price,  // Aqui garantimos que o preço está na resposta
        createdAt: newPurchase.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}



async function getProductPurchases(req, res) {
  try {
    const purchases = await Purchase.find({ products: req.params.productId });
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

async function getAllPurchases(req, res) {
  try {
    const purchases = await Purchase.find().populate('user').populate('products');
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

async function getPurchase(req, res) {
  try {
    const purchase = await Purchase.findById(req.params.id).populate('user').populate('products');
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

    await User.findByIdAndUpdate(purchase.user, { $pull: { purchases: purchase._id } });
    res.json({ message: 'Compra excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = { createPurchase, getAllPurchases, getPurchase, deletePurchase, getProductPurchases };