const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { models } = require('@models');

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

const jwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

passport.use(
  new JwtStrategy(jwtStrategyOption, async (jwtPayload, done) => {
    console.log(jwtPayload);
    const user = await models.user.findByPk(jwtPayload.id); // try catch
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }),
);

module.exports = passport;
