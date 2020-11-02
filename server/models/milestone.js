const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('milestone', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    isOpen: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
