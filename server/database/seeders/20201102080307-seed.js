const users = [
  {
    email: 'kyle@example.com',
    name: 'kyle',
    imageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAW0lEQVQ4T2NkYGBg+P///38QDQLir11gTDD9UnQPCh+dg66ecdRAjPAiFKYEw5BQoKNH0jAwEN0L6EFAspdHDcSbj7HldYJ5mZCJ6JE0BA0k5EVCyQrDy8PfQAAC85QlbKFkwQAAAABJRU5ErkJggg==',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'suckstar@example.com',
    name: 'sukstar',
    imageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAW0lEQVQ4T2NkYGBg+P///38QDQLir11gTDD9UnQPCh+dg66ecdRAjPAiFKYEw5BQoKNH0jAwEN0L6EFAspdHDcSbj7HldYJ5mZCJ6JE0BA0k5EVCyQrDy8PfQAAC85QlbKFkwQAAAABJRU5ErkJggg==',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'yeondu@example.com',
    name: 'yeondu',
    imageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAW0lEQVQ4T2NkYGBg+P///38QDQLir11gTDD9UnQPCh+dg66ecdRAjPAiFKYEw5BQoKNH0jAwEN0L6EFAspdHDcSbj7HldYJ5mZCJ6JE0BA0k5EVCyQrDy8PfQAAC85QlbKFkwQAAAABJRU5ErkJggg==',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const issues = [
  {
    title: '이슈 삭제 구현',
    createrId: 1,
    milestoneId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: '이슈 생성 구현',
    createrId: 1,
    milestoneId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: '이슈 수정 구현',
    createrId: 2,
    milestoneId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: '필터링 구현',
    createrId: 3,
    milestoneId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: '마일스톤 목록 구현',
    createrId: 1,
    milestoneId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const labels = [
  {
    title: 'iOS',
    color: '#abdee9',
    description: 'for iOS',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'web',
    color: '#e9abb7',
    description: 'for web',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'doc',
    color: '#e1abe9',
    description: 'for dob',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'feat',
    color: '#bdc2e0',
    description: 'for 기능',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'FE',
    color: '#29c4ab',
    description: 'for FE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'BE',
    color: '#abe9bd',
    description: 'for BE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const milestones = [
  {
    title: 'first week',
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'second week',
    description: '두번째 설명',
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'third week',
    description: '세번째 설명',
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const comments = [
  {
    content: '안녕하세요',
    isFirst: true,
    createrId: 1,
    issueId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'second comment',
    isFirst: false,
    createrId: 1,
    issueId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'third comment',
    isFirst: true,
    createrId: 2,
    issueId: 2,
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
