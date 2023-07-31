const { Card } = require('../models/card');
const responseCodes = require('../utils/constants');

const getCards = (_, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(responseCodes.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId).orFail()
    .then((deletedCard) => {
      if (deletedCard.owner.toString() !== req.user._id) {
        return res.status(responseCodes.FORBIDDEN).send({ message: 'Forbidden.' });
      }

      return res.send(deletedCard);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(responseCodes.NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      if (err.name === 'CastError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(responseCodes.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(responseCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(responseCodes.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
