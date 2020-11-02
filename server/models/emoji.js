const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('emoji', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
