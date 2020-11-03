const express = require('express');

const router = express.Router();
const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const Assignees = models.issueAssignee;

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    const { ...querys } = req.query;

    const params = {};
    console.log(querys);
    if (querys.isOpen !== undefined) {
      if (querys.isOpen == 'true') {
        params['isOpen'] = true;
      }
      if (querys.isOepn == 'false') {
        params['isOpen'] = false;
      }
    }

    if (querys.createrId !== undefined) {
      params['createrId'] = querys.createrId;
    }

    if (querys.milestoneId !== undefined) {
      params['milestoneId'] = querys.milestoneId;
    }

    /*
    추후, querys.values 돌면서 undefined 확인하고, 
    !== undefined면 getValue(or Id)해서 원하는 값 넣어 params obj 리턴되도록 구현하면 될듯.
    const getParam = require('@services/getParam');
    const param = getParam(querys);
    */

    console.log(params);

    const issues = await models.issue.findAll({
      include: [
        'creater',
        'milestone',
        {
          model: models.label,
          through: { attributes: [] },
        },
      ],
      where: params,
    });

    return res.status(200).json(issues);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    const { title, comment, assignees, labels, milestone } = req.body;
    const createrId = 1; //get createrId from passport
    const milestoneId = 1; //milestone의 id값 가져와야함

    // 1. 이슈 생성 (title, createrId, milestoneId) 넣음. (최신 issueId 값, milestoneId값 가져와야함)
    // 2. comment 생성, 해당 comment의 isFirst : true로 설정.
    // 3. issueAssignee table에 {issueId, assignessId list} 추가. (최신 issueId 값, assignessId값 가져와야함)
    // 4. issueLabel table에 {issueId, labelId list} 추가. (최신 issueId 값, labelId값 가져와야함)

    const issue = await models.issue.create({
      title,
      createrId,
      milestoneId,
    });

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
    const { title, isOpen, comment, assignees, labels, milestone } = req.body;
    const createrId = 1; //getCreaterId from passport
    const milestoneId = 2; //milestone의 id값 가져와야함

    // 1. 이슈 수정 (title, createrId, milestoneId) 넣음. (최신 issueId 값, milestoneId값 가져와야함)
    // 2. comment 생성, 해당 comment의 isFirst : true로 설정.
    // 3. issueAssignee table에 {issueId, assignessId list} 추가. (최신 issueId 값, assignessId값 가져와야함)
    // 4. issueLabel table에 {issueId, labelId list} 추가. (최신 issueId 값, labelId값 가져와야함)

    const issue = await models.issue.update(
      {
        title,
        createrId,
        milestoneId,
        isOpen,
      },
      { where: { issueId } },
    );

    return res.status(200).json({
      status: 200,
      data: issue,
      message: 'Succesfully issue updated',
    });
  }),
);

router.delete(
  '/:issueId',
  wrapAsync(async (req, res, next) => {
    const { issueId } = req.params;
    const issue = await models.issue.destroy({
      where: { issueId },
    });

    return res.status(200).json({
      status: 200,
      data: issue,
      message: 'Succesfully issue deleted',
    });
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

    return res.status(200).json(issueLabel);
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
