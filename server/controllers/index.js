const express = require('express');

const router = express.Router();

const userController = require('@controllers/user');
const issueController = require('@controllers/issue');
const labelController = require('@controllers/label');
const milestoneController = require('@controllers/milestone');
const commentController = require('@controllers/comment');
const emojiController = require('@controllers/emoji');
const authController = require('@controllers/auth');

router.use('/user', userController);
router.use('/issue', issueController);
router.use('/label', labelController);
router.use('/milestone', milestoneController);
router.use('/comment', commentController);
router.use('/emoji', emojiController);
router.use('/auth', authController);

module.exports = router;