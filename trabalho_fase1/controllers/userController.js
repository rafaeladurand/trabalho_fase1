const Product = require('../models/product');
const Purchase = require('../models/purchase');
const User = require('../models/user');

// Função para criar um novo usuário
async function createUser(req, res) {
  try {
    const { fullName, cpf, login, password } = req.body;

    // Verificando se o login ou o identificador já existe
    const userExists = await User.findOne({ $or: [{ login }, { cpf }] });
    if (userExists) {
      return res.status(400).json({ message: 'Login ou identificador já existe.' });
    }

    // Criando o novo usuário
    const newUser = new User({
      fullName,
      cpf,
      login,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}
async function getUserPurchases(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: 'purchases',
      populate: { path: 'product' }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(user.purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}
// Função para obter os detalhes de um usuário
async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Não retorna a senha
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

// Função para obter todos os usuários
async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password'); // Não retorna a senha
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

// Função para atualizar os dados de um usuário
async function updateUser(req, res) {
  try {
    const { fullName, login, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualizando os dados do usuário
    user.fullName = fullName || user.fullName;
    user.login = login || user.login;
    if (password) {
      user.password = password; // Atualiza a senha, se fornecida
    }

    await user.save();
    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

// Função para deletar um usuário
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser, getUserPurchases };
