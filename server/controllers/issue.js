const express = require('express');

const router = express.Router();
const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    const { query } = req;

    const whereCondition = {};
    if (query.isOpen) whereCondition.isOpen = query.isOpen === 'true';
    if (query.createrId) whereCondition.createrId = query.createrId;
    if (query.milestoneId) whereCondition.milestoneId = query.milestoneId;
    if (query.assigneeId) whereCondition['$assignees.id$'] = query.assigneeId;
    if (query.commenterId) whereCondition['$comments.createrId$'] = query.commenterId;
    if (query.labelId) whereCondition['$labels.id$'] = query.labelId;

    const issues = await models.issue.findAll({
      include: ['creater', 'milestone', 'assignees', 'comments', 'labels'],
      where: whereCondition,
    });

    const issuesWithInfo = await Promise.all(
      issues.map(async issue => {
        const mapperObj = issue.toJSON();

        mapperObj.assignees = await issue.getAssignees();
        mapperObj.labels = await issue.getLabels();

        return mapperObj;
      }),
    );

    return res.status(200).json(issuesWithInfo);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    const { title, firstComment, assigneeIds, labelIds, milestoneId } = req.body;

    const issueObj = req.user
      ? {
          title,
          comments: [firstComment],
          milestoneId,
          createrId: req.user.id,
        }
      : {
          title,
          comments: [firstComment],
          milestoneId,
          createrId: 1,
        };

    const issue = await models.issue.create(issueObj, { include: ['comments'] });

    await issue.setAssignees(assigneeIds);
    await issue.setLabels(labelIds);

    return res.status(200).json(issue);
  }),
);

router.post(
  '/:issueId/labels',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;
    const { labels } = req.body;

    const bulkData = labels.map(label => {
      return { issueId: +issueId, labelId: label };
    });
    const issueLabel = await models.issueLabel.bulkCreate(bulkData);

    return res.status(200).json(issueLabel);
  }),
);

router.post(
  '/:issueId/assignees',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;
    const { assignees } = req.body;

    const bulkData = assignees.map(assignee => {
      return { issueId: +issueId, userId: assignee };
    });
    const issueAssignee = await models.issueAssignee.bulkCreate(bulkData);

    return res.status(200).json(issueAssignee);
  }),
);

router.patch(
  '/:issueId',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;
    const { title, isOpen } = req.body;

    const [issue] = await models.issue.update(
      {
        title,
        isOpen,
      },
      { where: { id: issueId } },
    );

    return res.status(200).json({ numOfaffectedRows: issue });
  }),
);

router.delete(
  '/:issueId',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;
    const issue = await models.issue.destroy({
      where: { id: issueId },
    });

    return res.status(200).json({ numOfaffectedRows: issue });
  }),
);

router.delete(
  '/:issueId/label',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;
    const { labelId } = req.body;

    const issueLabel = await models.issueLabel.destroy({
      where: { issueId, labelId },
    });

    return res.status(200).json({ numOfaffectedRows: issueLabel });
  }),
);

router.delete(
  '/:issueId/assignee',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;
    const { userId } = req.body;

    const issueAssignee = await models.issueAssignee.destroy({
      where: { issueId, userId },
    });

    return res.status(200).json(issueAssignee);
  }),
);

module.exports = router;
