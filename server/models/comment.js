const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('comment', {
    isFirst: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    content: {
      type: DataTypes.STRING,
    },
  });
};
