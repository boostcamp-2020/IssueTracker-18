const express = require('express');

const router = express.Router();
const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const Issue = models.issue;
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
    const issues = await Issue.findAll({
      where: params,
    });

    return res.status(200).json({
      status: 200,
      data: issues,
      message: 'Succesfully Users Retrieved',
    });
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

    const issue = await Issue.create({
      title,
      createrId,
      milestoneId,
    });

    return res.status(200).json({
      status: 200,
      data: issue,
      message: 'Succesfully issue inserted',
    });
  }),
);

router.patch(
  '/',
  wrapAsync(async (req, res, next) => {
    const { id, title, isOpen, comment, assignees, labels, milestone } = req.body;
    const createrId = 1; //getCreaterId from passport
    const milestoneId = 2; //milestone의 id값 가져와야함

    // 1. 이슈 수정 (title, createrId, milestoneId) 넣음. (최신 issueId 값, milestoneId값 가져와야함)
    // 2. comment 생성, 해당 comment의 isFirst : true로 설정.
    // 3. issueAssignee table에 {issueId, assignessId list} 추가. (최신 issueId 값, assignessId값 가져와야함)
    // 4. issueLabel table에 {issueId, labelId list} 추가. (최신 issueId 값, labelId값 가져와야함)

    const issue = await Issue.update(
      {
        title,
        createrId,
        milestoneId,
        isOpen,
      },
      { where: { id } },
    );

    return res.status(200).json({
      status: 200,
      data: issue,
      message: 'Succesfully issue updated',
    });
  }),
);

router.delete(
  '/',
  wrapAsync(async (req, res, next) => {
    const { id } = req.body;

    const issue = await Issue.destroy({
      where: { id },
    });

    return res.status(200).json({
      status: 200,
      data: issue,
      message: 'Succesfully issue deleted',
    });
  }),
);

module.exports = router;
