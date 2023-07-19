const router = require('express').Router();

const userRouter = require('./user');
const cardRouter = require('./card');
const responseCodes = require('../utils/constants');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (_, res) => { res.status(responseCodes.NOT_FOUND).send({ message: 'Страница не найдена' }); });

module.exports = router;
