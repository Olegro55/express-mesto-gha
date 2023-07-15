const { Card } = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((deletedCard) => res.send(deletedCard))
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  // likeCard,
  // dislikeCard,
};
