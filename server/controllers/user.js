const express = require('express');

const router = express.Router();
const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const User = models.user;

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    const users = await User.findAll();
    return res.status(200).json({ users });
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

    return res.status(200).json({
      status: 200,
      data: user,
      message: 'Succesfully user inserted',
    });
  }),
);

router.patch(
  '/',
  wrapAsync(async (req, res, next) => {
    const { id, title, comment, assignees, labels, milestone } = req.body;

    const user = await User.update(
      {
        email,
        imageUrl,
        name,
      },
      { where: { id } },
    );

    return res.status(200).json({
      status: 200,
      data: user,
      message: 'Succesfully user updated',
    });
  }),
);

router.delete(
  '/',
  wrapAsync(async (req, res, next) => {
    const { id } = req.body;

    const user = await User.destroy({
      where: { id },
    });

    return res.status(200).json({
      status: 200,
      data: user,
      message: 'Succesfully user deleted',
    });
  }),
);

module.exports = router;
