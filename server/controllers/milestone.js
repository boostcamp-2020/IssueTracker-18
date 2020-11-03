const router = require('express').Router();

const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const Milestone = models.milestone;
const Issue = models.issue;

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const milestones = await Milestone.findAll({ include: Issue });
    res.status(200).json(milestones);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const createdMilestone = await Milestone.create(req.body); // validation needed
    res.status(200).json(createdMilestone);
  }),
);

router.patch(
  '/:milestoneId',
  wrapAsync(async (req, res) => {
    const { milestoneId } = req.params;
    const [numOfAffectedRows] = await Milestone.update(req.body, {
      where: {
        id: milestoneId,
      },
    });
    res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
  }),
);

router.delete(
  '/:labelId',
  wrapAsync(async (req, res) => {
    const { milestoneId } = req.params;
    const numOfAffectedRows = await Milestone.destroy({
      where: {
        id: milestoneId,
      },
    });
    res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
  }),
);

module.exports = router;
