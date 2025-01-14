// import { version } from '../../package.json';
import { config } from '../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SortingHatService Documentation',
    version: '0.0.0',
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export { swaggerDefinition };
