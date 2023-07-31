const { statusCodes } = require('../utils/constants');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');
const { Card } = require('../models/card');

const getCards = (_, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(statusCodes.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      }
      next();
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Forbidden.'));
      }

      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((deletedCard) => res.send(deletedCard))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      }
      next();
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      }
      next();
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      }
      next();
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
