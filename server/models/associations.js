const applyAssociations = sequelize => {
  const { user, issue, label, milestone, comment, emoji } = sequelize.models;

  user.belongsToMany(issue, { through: 'issueAssignee' });
  issue.belongsToMany(user, { through: 'issueAssignee' });

  user.hasMany(issue);
  issue.belongsTo(user, { as: 'creater' });

  issue.belongsToMany(label, { through: 'issueLabel' });
  label.belongsToMany(issue, { through: 'issueLabel' });

  milestone.hasMany(issue);
  issue.belongsTo(milestone);

  user.hasMany(comment);
  comment.belongsTo(user, { as: 'creater' });

  issue.hasMany(comment);
  comment.belongsTo(issue);

  emoji.belongsToMany(comment, { through: 'commentEmoji' });
  comment.belongsToMany(emoji, { through: 'commentEmoji' });
};

module.exports = applyAssociations;
