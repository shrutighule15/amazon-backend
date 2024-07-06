const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const paymentRoutes = require('./routes/payments')

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect('mongodb+srv://shrutighule555:Shruti15@cluster0.qoyxj0c.mongodb.net/amazon', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
const indexRoute = require('./routes/index');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const paymentsRoute = require('./routes/payments');

app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/api/payment', paymentsRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
