const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

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

app.use(routes);

app.listen(PORT);
