const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('issue', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isOpen: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
