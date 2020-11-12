const router = require('express').Router();
const passport = require('@passport');
const ensureAuthenticated = require('@passport/authenticate-middleware');

router.get('/', (req, res) => {
  res.send(
    `<button onclick="location.href='http://localhost:8080/auth/github'" type="button"> 깃허브로 로그인 해버리기 </button>`,
  );
});

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/' }),
  (req, res) => {
    // res.redirect('/auth/check');
    res.json(req.user);
  },
);

router.get('/check', ensureAuthenticated, (req, res) => {
  res.send(`<span>${req.user.email}</span>
            <br>
            <img src="${req.user.imageUrl}">`);
});

module.exports = router;
