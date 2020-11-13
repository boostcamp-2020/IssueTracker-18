const router = require('express').Router();
const passport = require('@passport');
const jwt = require('jsonwebtoken');

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
);

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/auth' }),
  (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    res.redirect(`/login?token=${token}`);
  },
);

module.exports = router;