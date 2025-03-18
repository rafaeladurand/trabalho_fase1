const Product = require("../models/product");
const Purchase = require("../models/purchase");
const User = require("../models/user");

async function createPurchase(req, res) {
  try {
    const { userId, productIds } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      return res
        .status(404)
        .json({ message: "Um ou mais produtos não foram encontrados." });
    }

    const finalPrices = products.map((product) => ({
      productId: product._id,
      price: product.promotionalPrice ?? product.currentPrice,
    }));

    const totalPrice = finalPrices.reduce(
      (total, item) => total + item.price,
      0
    );

    const newPurchase = new Purchase({
      user: userId,
      products: productIds,
      finalPrices,
      totalPrice,
    });

    await newPurchase.save();

    user.purchases.push(newPurchase._id);
    await user.save();

    res.status(201).json({
      message: "Compra registrada com sucesso.",
      purchase: newPurchase,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

async function getProductPurchases(req, res) {
  try {
    const purchases = await Purchase.find({ products: req.params.productId });
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

async function getAllPurchases(req, res) {
  try {
    const purchases = await Purchase.find()
      .populate("user")
      .populate("products");
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

async function getPurchase(req, res) {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate("user")
      .populate("products");
    if (!purchase) {
      return res.status(404).json({ message: "Compra não encontrada." });
    }
    res.json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

async function deletePurchase(req, res) {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Compra não encontrada." });
    }

    await User.findByIdAndUpdate(purchase.user, {
      $pull: { purchases: purchase._id },
    });
    res.json({ message: "Compra excluída com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchase,
  deletePurchase,
  getProductPurchases,
};
