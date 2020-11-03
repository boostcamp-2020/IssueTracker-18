const express = require('express');
const sequelize = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const router = express.Router();
const { models } = sequelize;

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    const emojis = await models.emoji.findAll({ attributes: ['id', 'name', 'imageUrl'] });

    return res.status(200).json(emojis);
  }),
);

module.exports = router;
