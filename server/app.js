const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require('module-alias/register');
const passport = require('@passport');
const path = require('path');

const indexController = require('@controllers');
const authController = require('@controllers/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); // secret
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public')); // for dev

app.use('/api', indexController);
app.use('/auth', authController);
app.get('/login', (req, res) => {
  console.log('hi');
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.listen(8080);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
