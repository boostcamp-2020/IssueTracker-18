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

    const sql = `select cecu.*, e.name emojiName, e.imageUrl emojiImageUrl from emojis e 
        join (select cu.*, ce.emojiId from commentEmoji ce 
            join (SELECT c.id, c.isFirst, c.content, c.createdAt, u.name userName, u.imageUrl userImageUrl FROM comments c 
                join users u where c.issueId = ? and c.createrId = u.id) cu where ce.commentId = cu.id) cecu where e.id = cecu.emojiId`;

    const comments = await sequelize.query(sql, {
      replacements: [issueId],
      type: sequelize.QueryTypes.SELECT,
    });

    console.log(comments);

    let result = { firstComment: null, comments: [] };
    let otherComments = {};

    comments.forEach(comment => {
      if (comment.isFirst === 1) result.firstComment = comment;
      if (comment.isFirst === 0) {
        if (otherComments[comment.id]) {
          otherComments[comment.id].emojis.push({
            emojiName: comment.emojiName,
            emojiImageUrl: comment.emojiImageUrl,
          });
        }
        if (!otherComments[comment.id]) {
          otherComments[comment.id] = {
            id: comment.id,
            isFirst: comment.isFirst,
            content: comment.content,
            createdAt: comment.createdAt,
            userName: comment.userName,
            userImageUrl: comment.userImageUrl,
            emojis: [
              {
                emojiName: comment.emojiName,
                emojiImageUrl: comment.emojiImageUrl,
              },
            ],
          };
        }
      }
    });

    result.comments = Object.values(otherComments);

    return res.status(200).json({
      status: 200,
      result,
    });
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
