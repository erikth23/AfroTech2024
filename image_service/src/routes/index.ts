import express from 'express';
import { router as imageRoute} from './image.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/image',
    route: imageRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export { router };
