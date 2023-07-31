const router = require('express').Router();

const userRouter = require('./user');
const cardRouter = require('./card');
const { NotFoundError } = require('../errors');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => { next(new NotFoundError('Страница не найдена')); });

module.exports = router;
