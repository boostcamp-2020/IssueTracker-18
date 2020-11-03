const express = require('express');
const sequelize = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const router = express.Router();
const { models } = sequelize;
const emojiModel = models.emoji;

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    const emojis = await emojiModel.findAll({ attributes: ['id', 'name', 'imageUrl'] });

    return res.status(200).json({
      status: 200,
      result: emojis,
    });
  }),
);

module.exports = router;
