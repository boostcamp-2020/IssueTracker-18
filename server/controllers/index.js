const express = require('express');

const router = express.Router();

// const userController = require('@controllers/user');
const issueController = require('@controllers/issue');

router.use('/issue', issueController);

module.exports = router;
