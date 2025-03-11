const Product = require('../models/product');

// Função para criar um novo produto
async function createProduct(req, res) {
  try {
    const { name, currentPrice, promotionalPrice, type, description, expirationDate } = req.body;

    // Verificando se o nome do produto já existe
    const productExists = await Product.findOne({ name });
    if (productExists) {
      return res.status(400).json({ message: 'Produto já existe.' });
    }

    // Criando um novo produto
    const newProduct = new Product({
      name,
      currentPrice,
      promotionalPrice,
      type,
      description,
      expirationDate,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Produto criado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

// Função para obter os dados de um produto
async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

// Função para obter todos os produtos
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

// Função para atualizar os dados de um produto
async function updateProduct(req, res) {
  try {
    const { name, currentPrice, promotionalPrice, type, description, expirationDate } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Atualizando os dados do produto
    product.name = name || product.name;
    product.currentPrice = currentPrice || product.currentPrice;
    product.promotionalPrice = promotionalPrice || product.promotionalPrice;
    product.type = type || product.type;
    product.description = description || product.description;
    product.expirationDate = expirationDate || product.expirationDate;

    await product.save();
    res.json({ message: 'Produto atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.json({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct };
