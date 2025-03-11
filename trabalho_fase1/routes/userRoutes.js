const express = require('express');
const router = express.Router();
const { createUser, getUser, getAllUsers, updateUser, deleteUser, getUserPurchases } = require('../controllers/userController');

// Rota para criação de usuário
router.post('/register', createUser);

// Rota para obter os dados de um usuário
router.get('/:id', getUser);

// Rota para obter todos os usuários
router.get('/', getAllUsers);

// Rota para atualizar os dados de um usuário
router.put('/:id', updateUser);

// Rota para deletar um usuário
router.delete('/:id', deleteUser);

router.get('/:userId/purchases', getUserPurchases);

module.exports = router;
