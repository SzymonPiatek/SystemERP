import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '1.0.0',
    info: {
      title: 'System ERP API',
      version: '1.0.0',
      description: 'API documentation for System ERP API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
