const express = require('express');
const wordRoute = require('./word.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const userWordRoute = require('./userWord.route');
const topicRoute = require('./topic.route');
const questionRoute = require('./question.route');
const examRoute = require('./exam.route');
const examOfUserRoute = require('./examOfUser.route');

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
    {
        path: '/user-words',
        route: userWordRoute,
    },
    {
        path: '/topics',
        route: topicRoute,
    },
    {
        path: '/questions',
        route: questionRoute,
    },
    {
        path: '/exams',
        route: examRoute,
    },
    {
        path: '/exams-of-users',
        route: examOfUserRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
