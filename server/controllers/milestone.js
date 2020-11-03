const router = require('express').Router();

const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

const Milestone = models.milestone;

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const milestones = await Milestone.findAll();

    await Promise.all(
      milestones.map(async milestone => {
        const milestoneData = milestone.dataValues;
        const issues = await milestone.getIssues();
        milestoneData.issues = issues;
        return milestoneData;
      }),
    );

    res.status(200).json(milestones);
  }),
);

// router.post(
//   '/',
//   wrapAsync(async (req, res) => {
//     const createdLabel = await Label.create(req.body); // validation needed
//     res.status(200).json(createdLabel);
//   }),
// );

// router.patch(
//   '/:labelId',
//   wrapAsync(async (req, res) => {
//     const { labelId } = req.params;
//     const [numOfAffectedRows] = await Label.update(req.body, {
//       where: {
//         id: labelId,
//       },
//     });
//     res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
//   }),
// );

// router.delete(
//   '/:labelId',
//   wrapAsync(async (req, res) => {
//     const { labelId } = req.params;
//     const numOfAffectedRows = await Label.destroy({
//       where: {
//         id: labelId,
//       },
//     });
//     res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
//   }),
// );

module.exports = router;
