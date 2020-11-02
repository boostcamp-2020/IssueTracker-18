const express = require('express');
const logger = require('morgan');
require('dotenv').config();
require('module-alias/register');

const sequelize = require('@models');
const indexController = require('@controllers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexController);

app.listen(8080);
