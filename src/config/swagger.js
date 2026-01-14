const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Guestara Menu & Pricing API',
      version: '1.0.0',
      description: 'Backend APIs for menu, pricing, booking and add-ons'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // routes se docs read karega
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
