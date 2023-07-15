const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  // likeCard,
  // dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

// router.put('/:cardId/likes', celebrates.checkIdCard, likeCard);

// router.delete('/:cardId/likes', celebrates.checkIdCard, dislikeCard);

module.exports = router;
