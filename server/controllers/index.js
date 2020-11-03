const express = require('express');

const router = express.Router();

// const userController = require('@controllers/user');
const issueController = require('@controllers/issue');
const usercontroller = require('@controllers/user');

router.use('/issue', issueController);
router.use('/user', usercontroller);

module.exports = router;
