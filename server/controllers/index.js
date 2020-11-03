const express = require('express');

const router = express.Router();

// const userController = require('@controllers/user');
const issueController = require('@controllers/issue');
const labelController = require('@controllers/label');
const milestoneController = require('@controllers/milestone');

router.use('/issue', issueController);
router.use('/label', labelController);
router.use('/milestone', milestoneController);

module.exports = router;
