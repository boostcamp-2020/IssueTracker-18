const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('user', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
