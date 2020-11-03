require('dotenv').config();

module.exports = {
  development: {
    dialect: 'mysql',
    database: process.env.DB_LOCAL_NAME,
    username: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASS,
    host: process.env.DB_LOCAL_HOST,
    port: process.env.DB_LOCAL_PORT,
  },
  production: {
    dialect: 'mysql',
    database: process.env.DB_PRODUCT_NAME,
    username: process.env.DB_PRODUCT_USER,
    password: process.env.DB_PRODUCT_PASS,
    host: process.env.DB_PRODUCT_HOST,
  },
};
