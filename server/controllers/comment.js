const express = require('express');
const sequelize = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const router = express.Router();
const { models } = sequelize;

router.get(
  '/:issueId',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;

    const issue = await models.issue.findOne({ where: { id: issueId } });
    const comments = await issue.getComments({
      include: [
        {
          model: models.emoji,
          attributes: ['id', 'name', 'imageUrl'],
          through: { attributes: [] },
        },
        'creater',
      ],
      attributes: ['id', 'isFirst', 'content', 'createdAt', 'updatedAt'],
    });

    return res.status(200).json(comments);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    const { isFirst, content, createrId, issueId } = req.body;

    const comment = await models.comment.create({ isFirst, content, createrId, issueId });

    return res.status(200).json(comment);
  }),
);

router.patch(
  '/',
  wrapAsync(async (req, res, next) => {
    const { id, content } = req.body;

    const [result] = await models.comment.update({ content }, { where: { id } });

    if (result === 1) {
      return res.status(200).json(result);
    }
  }),
);

router.delete(
  '/:commentId',
  wrapAsync(async (req, res, next) => {
    const { commentId } = req.params;

    const result = await models.comment.destroy({ where: { id: commentId } });

    if (result === 1) {
      return res.status(200).json(result);
    }
  }),
);

module.exports = router;
