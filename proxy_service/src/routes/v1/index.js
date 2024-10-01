const express = require('express');
const answersRoute = require('./answers.route');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const publicRoute = require('./public.route')
const config = require('../../config/config');
const checkJwt = require('../../middlewares/jwt');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/public',
    route: publicRoute,
  }
];

const authProtectedRoutes = [
  {
    path: "/answers",
    route: answersRoute
  }
]

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

authProtectedRoutes.forEach((route) => {
  router.use(route.path, checkJwt, route.route)
})

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
