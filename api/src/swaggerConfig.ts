import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'System ERP API',
      version: '1.0.0',
      description: 'API documentation for System ERP API',
    },
    servers: [
      {
        url: 'http://localhost/api/v1/',
      },
    ],
  },
  apis: ['./src/models/**/swagger/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
