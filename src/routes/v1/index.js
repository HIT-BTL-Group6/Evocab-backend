const express = require('express');
const wordRoute = require('./word.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/words',
        route: wordRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
