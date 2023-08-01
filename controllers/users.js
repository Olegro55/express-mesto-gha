const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { statusCodes } = require('../utils/constants');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors');

const User = require('../models/user');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const userData = req.body;
      userData.password = hash;
      return User.create(userData);
    })
    .then((user) => res.status(statusCodes.CREATED).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }
      next();
    });
};

const login = (req, res, next) => {
  User.findUserByCredentials(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      }
      next();
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
      next();
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      next();
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
      next();
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
};
