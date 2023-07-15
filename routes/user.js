const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  // updateUser,
  // updateAvatar,
  // getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
// router.get('/me', getCurrentUser);
router.get('/:userId', getUser);

router.post('/', createUser);
// router.patch(
//   '/me',
//   celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().min(2).max(30),
//       about: Joi.string().min(2).max(30),
//     }),
//   }),
//   updateUser,
// );

// router.patch(
//   '/me/avatar',
//   celebrate({
//     body: Joi.object().keys({
//       avatar: Joi.string().regex(
//         /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i,
//       ),
//     }),
//   }),
//   updateAvatar,
// );

module.exports = router;
