const express = require('express');

const router = express.Router();
const { models } = require('@models');
const wrapAsync = require('@utils/async-warpper');

const Issue = models.issue;

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    // const { email } = req.body;

    const issues = await Issue.findAll();
    return res.status(200).json({
      status: 200,
      data: issues,
      message: 'Succesfully Users Retrieved',
    });
  }),
);

module.exports = router;
