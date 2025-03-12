const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Purchase = require('./purchase');

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    purchases: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Purchase' 
    }],
  },
  { timestamps: true }
);

// Método para criptografar a senha antes de salvar no banco de dados
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Método para comparar senhas durante o login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
