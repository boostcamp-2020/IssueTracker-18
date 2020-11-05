const router = require('express').Router();

const { models } = require('@models');
const wrapAsync = require('@utils/async-wrapper');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const labels = await models.label.findAll();
    res.status(200).json(labels);
  }),
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const createdLabel = await models.label.create(req.body); // validation needed
    res.status(200).json(createdLabel);
  }),
);

router.patch(
  '/:labelId',
  wrapAsync(async (req, res) => {
    const { labelId } = req.params;
    const [numOfAffectedRows] = await models.label.update(req.body, {
      where: {
        id: labelId,
      },
    });
    res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
  }),
);

router.delete(
  '/:labelId',
  wrapAsync(async (req, res) => {
    const { labelId } = req.params;
    const numOfAffectedRows = await models.label.destroy({
      where: {
        id: labelId,
      },
    });
    res.status(200).json({ numOfaffectedRows: numOfAffectedRows });
  }),
);

module.exports = router;
