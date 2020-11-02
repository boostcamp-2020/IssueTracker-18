const Sequelize = require('sequelize');
const applyAssociations = require('@models/associations');
const dbConnectionConfig = require('@database/config').production;

const sequelize = new Sequelize(dbConnectionConfig);

const modelDefiners = [
  require('@models/user'),
  require('@models/issue'),
  require('@models/label'),
  require('@models/milestone'),
  require('@models/comment'),
  require('@models/emoji'),
];

modelDefiners.forEach(modelDefiner => {
  modelDefiner(sequelize);
});

applyAssociations(sequelize);

const synchronizeModels = async () => {
  await sequelize.sync({ alter: true });
  // await require('@model/dummy')(sequelize.models);
  // await sequelize.models.comment.destroy({ truncate: true });
  // await sequelize.models.issue.destroy({ truncate: true });
  // await sequelize.models.user.destroy({ truncate: true });
  // await sequelize.drop();
};

synchronizeModels();

module.exports = sequelize;
