const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json()); 


app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/users', userRoutes);


const port = 3000;
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});
