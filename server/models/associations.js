const applyAssociations = sequelize => {
  const { user, issue, label, milestone, comment, emoji } = sequelize.models;

  user.belongsToMany(issue, { as: 'issues', through: 'issueAssignee' });
  issue.belongsToMany(user, { as: 'assignees', through: 'issueAssignee' });

  user.hasMany(issue, { sourceKey: 'id', foreignKey: 'createrId' });
  issue.belongsTo(user, { as: 'creater' });

  issue.belongsToMany(label, { as: 'labels', through: 'issueLabel' });
  label.belongsToMany(issue, { as: 'issues', through: 'issueLabel' });

  milestone.hasMany(issue);
  issue.belongsTo(milestone);

  user.hasMany(comment, { sourceKey: 'id', foreignKey: 'createrId' });
  comment.belongsTo(user, { as: 'creater' });

  issue.hasMany(comment);
  comment.belongsTo(issue);

  emoji.belongsToMany(comment, { as: 'comments', through: 'commentEmoji' });
  comment.belongsToMany(emoji, { as: 'emojis', through: 'commentEmoji' });
};

module.exports = applyAssociations;
