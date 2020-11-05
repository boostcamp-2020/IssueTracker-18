const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const { models } = require('@models');

// session 에 저장시 id 로만 저장
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// session 에서 꺼낼 때 user 객체로 변환
passport.deserializeUser(async (userId, done) => {
  const user = await models.user.findByPk(userId);
  done(null, user.toJSON());
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { username, photos } = profile;

      const [user] = await models.user.findOrCreate({
        where: { email: username },
        defaults: {
          email: username,
          imageUrl: photos[0].value,
          name: username,
        },
      });

      return done(null, user.toJSON());
    },
  ),
);

module.exports = passport;
