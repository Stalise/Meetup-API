import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meetup API',
      description: 'A simple Express Library API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:8000' }],
  },
  apis: ['./src/routes/**/*.js', './src/data/swagger/*.js'],
};

const specs = swaggerJSDoc(options);

export default specs;
