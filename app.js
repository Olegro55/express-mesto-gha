const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req, _, next) => {
  req.user = {
    _id: '64b26aa6ec2c88d561efe856',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (_, res) => { res.status(404).send({ message: 'Страница не найдена' }); });

app.listen(PORT);
