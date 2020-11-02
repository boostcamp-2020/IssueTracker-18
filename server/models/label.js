const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('label', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    color: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
