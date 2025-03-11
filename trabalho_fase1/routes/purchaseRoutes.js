const express = require('express');
const router = express.Router();
const { createPurchase, getAllPurchases, getPurchase, deletePurchase, getProductPurchases } = require('../controllers/purchaseController');

// Rota para criar uma nova compra
router.post('/create', createPurchase);

// Rota para obter todas as compras
router.get('/', getAllPurchases);

// Rota para obter uma compra específica
router.get('/:id', getPurchase);

// Rota para deletar uma compra
router.delete('/:id', deletePurchase);

router.get('/:productId/purchases', getProductPurchases);

module.exports = router;
