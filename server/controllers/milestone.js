const router = require('express').Router();

const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const milestones = await models.milestone.findAll({
      include: models.issue,
    });
    res.status(200).json(milestones);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const createdMilestone = await models.milestone.create(req.body); // validation needed
    res.status(200).json(createdMilestone);
  }),
);

router.patch(
  '/:milestoneId',
  wrapAsync(async (req, res) => {
    const { milestoneId } = req.params;
    const [numOfAffectedRows] = await models.milestone.update(req.body, {
      where: {
        id: milestoneId,
      },
    });
    res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
  }),
);

router.delete(
  '/:milestoneId',
  wrapAsync(async (req, res) => {
    const { milestoneId } = req.params;
    const numOfAffectedRows = await models.milestone.destroy({
      where: {
        id: milestoneId,
      },
    });
    res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
  }),
);

module.exports = router;
