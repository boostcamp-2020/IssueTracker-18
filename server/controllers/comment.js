const express = require('express');
const sequelize = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const router = express.Router();
const { models } = sequelize;

router.get(
  '/:issueId',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;

    const issue = await models.issue.findOne({
      include: ['creater', 'milestone', 'assignees', 'labels'],
      where: { id: issueId },
    });
    const issueObj = issue.toJSON();
    issueObj.assignees = await issue.getAssignees();
    issueObj.labels = await issue.getLabels();

    const comments = await issue.getComments({
      include: [
        {
          model: models.emoji,
          as: 'emojis',
          attributes: ['id', 'name', 'imageUrl'],
          through: { attributes: [] },
        },
        'creater',
      ],
      attributes: ['id', 'isFirst', 'content', 'createdAt', 'updatedAt'],
    });

    const firstCommentIndex = comments.findIndex(comment => comment.isFirst === true);
    const firstComment = comments.splice(firstCommentIndex, 1);

    return res.status(200).json({ issue: issueObj, comments: { firstComment, comments } });
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    const { isFirst, content, createrId, issueId } = req.body;

    const comment = await models.comment.create({ isFirst, content, createrId, issueId });

    const newComment = await models.comment.findOne({
      include: [
        {
          model: models.emoji,
          as: 'emojis',
          attributes: ['id', 'name', 'imageUrl'],
          through: { attributes: [] },
        },
        'creater',
      ],
      attributes: ['id', 'isFirst', 'content', 'createdAt', 'updatedAt'],
      where: { id: comment.id },
    });

    return res.status(200).json(newComment);
  }),
);

router.patch(
  '/',
  wrapAsync(async (req, res, next) => {
    const { id, content } = req.body;

    const [result] = await models.comment.update({ content }, { where: { id } });

    if (result === 1) {
      const updatedComment = await models.comment.findOne({
        include: [
          {
            model: models.emoji,
            as: 'emojis',
            attributes: ['id', 'name', 'imageUrl'],
            through: { attributes: [] },
          },
          'creater',
        ],
        attributes: ['id', 'isFirst', 'content', 'createdAt', 'updatedAt'],
        where: { id },
      });

      return res.status(200).json(updatedComment);
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
