const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const auth = require('./middlewares/auth');
const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(routes);

app.listen(PORT);
