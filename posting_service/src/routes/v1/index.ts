import express from 'express';
import RolesRouter from './roles.route';
import TestRouter from './tests.route'

const router = express.Router()

const defaultRoutes = [
    {
        path: '/roles',
        route: RolesRouter
    },
    {
        path: '/test',
        route: TestRouter
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router;
