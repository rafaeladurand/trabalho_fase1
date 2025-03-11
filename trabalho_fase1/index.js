const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('./database/db.js');

const app = express();
app.use(bodyParser.json()); // Para ler o corpo das requisições como JSON

// Correção: Usar app.use() em vez de app.get()
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/users', userRoutes);

// Inicialização do servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});
