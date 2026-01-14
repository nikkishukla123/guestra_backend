const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


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
//item routes
const itemRoutes = require('./routes/item.routes');
app.use('/items', itemRoutes);
//price route
const priceRoutes = require('./routes/price.routes');
app.use('/items', priceRoutes);
//booking route
const bookingRoutes = require('./routes/booking.routes');
app.use('/bookings', bookingRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
