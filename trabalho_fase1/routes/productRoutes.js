const express = require('express');
const router = express.Router();
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Rota para criação de produto
router.post('/register', createProduct);

// Rota para obter os dados de um produto
router.get('/:id', getProduct);

// Rota para obter todos os produtos
router.get('/', getAllProducts);

// Rota para atualizar os dados de um produto
router.put('/:id', updateProduct);

// Rota para deletar um produto
router.delete('/:id', deleteProduct);

module.exports = router;
