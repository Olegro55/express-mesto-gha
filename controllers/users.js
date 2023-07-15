const User = require('../models/user');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((next));
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((next));
};

const createUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((next));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
