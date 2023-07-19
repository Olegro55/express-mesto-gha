const User = require('../models/user');
const responseCodes = require('../utils/constants');

const getUsers = (_, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(responseCodes.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      if (err.name === 'CastError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(responseCodes.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(responseCodes.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
