const express = require('express');
const mongoose = require('mongoose');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signi', login);
app.post('/signup', createUser);

app.use(auth);

app.use(routes);

app.use(error);

app.listen(PORT);
