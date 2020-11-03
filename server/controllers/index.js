const express = require('express');

const router = express.Router();

// const userController = require('@controllers/user');
const issueController = require('@controllers/issue');
const commentController = require('@controllers/comment');
const emojiController = require('@controllers/emoji');

router.use('/issue', issueController);
router.use('/comment', commentController);
router.use('/emoji', emojiController);

module.exports = router;
