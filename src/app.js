const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});
// category routes
const categoryRoutes = require('./routes/category.routes');
app.use('/categories', categoryRoutes);

module.exports = app;