const express = require('express');

const router = express.Router();
const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');
const passport = require('../passport');

const User = models.user;

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    const users = await User.findAll();
    return res.status(200).json(users);
  }),
);

router.get(
  '/auth',
  passport.authenticate('jwt', { session: false }),
  wrapAsync(async (req, res) => {
    const user = await models.user.findByPk(req.user.id);
    return res.status(200).json(user);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    const { email, imageUrl, name } = req.body;

    const user = await User.create({
      email,
      imageUrl,
      name,
    });

    return res.status(200).json(user);
  }),
);

router.patch(
  '/:userId',
  wrapAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { imageUrl, name } = req.body;

    const [user] = await User.update(
      {
        imageUrl,
        name,
      },
      { where: { id: userId } },
    );

    return res.status(200).json({ numOfaffectedRows: user });
  }),
);

router.delete(
  '/:userId',
  wrapAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.destroy({
      where: { id: userId },
    });

    return res.status(200).json({ numOfaffectedRows: user });
  }),
);

module.exports = router;
