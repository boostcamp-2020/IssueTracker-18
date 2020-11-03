const express = require('express');
const sequelize = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const router = express.Router();
const { models } = sequelize;
const commentModel = models.comment;

router.get(
  '/:issueId',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;

    const issue = await models.issue.findOne({ where: { id: issueId } });
    const commentss = await issue.getComments({ include: [models.emoji, 'creater'] });

    return res.status(200).json(commentss);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    const { isFirst, content, userId, createrId, issueId } = req.body;

    const result = await commentModel.create({ isFirst, content, userId, createrId, issueId });

    return res.status(200).json({
      status: 200,
      result,
    });
  }),
);

router.put(
  '/',
  wrapAsync(async (req, res, next) => {
    const { id, content } = req.body;

    const [result] = await commentModel.update({ content }, { where: { id } });

    if (result === 1) {
      return res.status(200).json({
        status: 200,
        result,
      });
    }
  }),
);

router.delete(
  '/:commentId',
  wrapAsync(async (req, res, next) => {
    const { commentId } = req.params;

    const result = await commentModel.destroy({ where: { id: commentId } });

    if (result === 1) {
      return res.status(200).json({
        status: 200,
        result,
      });
    }
  }),
);

module.exports = router;
