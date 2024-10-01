import express from 'express';
import { router as docsRoute} from './docs.route';
import { router as analyzeRoute } from './assessment.route';
import { config } from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/test',
    route: analyzeRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env == "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export { router };
