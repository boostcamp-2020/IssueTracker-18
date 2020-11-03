const users = [
  {
    email: 'kyle@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'suckstar@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'yeondu@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const issues = [
  {
    title: 'first issue',
    createrId: 1,
    milestoneId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'second issue',
    createrId: 1,
    milestoneId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'third issue',
    createrId: 2,
    milestoneId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'four 이슈!',
    createrId: 3,
    milestoneId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: '다섯번째 이슈!@',
    createrId: 1,
    milestoneId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const labels = [
  {
    title: 'iOS',
    color: 'red',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'web',
    color: 'blue',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'doc',
    color: 'green',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const milestones = [
  {
    title: 'first week',
    description: 'first description',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'second week',
    description: '두번째 설명',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'third week',
    description: '세번째 설명',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const comments = [
  {
    content: 'first comment',
    createrId: 1,
    issueId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'second comment',
    createrId: 1,
    issueId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'third comment',
    createrId: 2,
    issueId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const issueAssignee = [
  {
    issueId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    issueId: 1,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    issueId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    issueId: 2,
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const issueLabel = [
  {
    issueId: 1,
    labelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    issueId: 1,
    labelId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    issueId: 2,
    labelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    issueId: 2,
    labelId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const emojis = [
  {
    name: 'airplane',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'girl',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'fruits',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const commentEmoji = [
  {
    commentId: 1,
    emojiId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    commentId: 2,
    emojiId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    commentId: 1,
    emojiId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('labels', labels, {});
    await queryInterface.bulkInsert('milestones', milestones, {});
    await queryInterface.bulkInsert('issues', issues, {});
    await queryInterface.bulkInsert('comments', comments, {});
    await queryInterface.bulkInsert('issueAssignee', issueAssignee, {});
    await queryInterface.bulkInsert('issueLabel', issueLabel, {});
    await queryInterface.bulkInsert('emojis', emojis, {});
    await queryInterface.bulkInsert('commentEmoji', commentEmoji, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('labels', null, {});
    await queryInterface.bulkDelete('milestones', null, {});
    await queryInterface.bulkDelete('issues', null, {});
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('issueAssignee', null, {});
    await queryInterface.bulkDelete('issueLabel', null, {});
    await queryInterface.bulkDelete('emojis', null, {});
    await queryInterface.bulkDelete('commentEmoji', null, {});
  },
};
