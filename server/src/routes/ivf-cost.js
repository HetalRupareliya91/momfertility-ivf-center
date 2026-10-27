const { Router } = require('express');
const pricing = require('../data/seed/pricing.json');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

// GET /api/ivf-cost/options
router.get('/options', (req, res) => res.json({ data: pricing }));

// POST /api/ivf-cost  { treatment, cycles, addons: [] }
router.post('/', (req, res, next) => {
  const { treatment, cycles = 1, addons = [] } = req.body || {};
  const base = pricing.treatments.find((t) => t.id === treatment);
  const n = Number(cycles);

  if (!base) return next(new HttpError(422, 'Please choose a valid treatment.'));
  if (!Number.isInteger(n) || n < 1 || n > 3) return next(new HttpError(422, 'Cycles must be between 1 and 3.'));
  if (!Array.isArray(addons)) return next(new HttpError(422, 'Add-ons must be a list.'));

  const breakdown = [
    { label: `${base.label} × ${n}`, min: base.min * n, max: base.max * n },
    ...pricing.addons.filter((a) => addons.includes(a.id)).map(({ label, min, max }) => ({ label, min, max })),
  ];
  const min = breakdown.reduce((sum, item) => sum + item.min, 0);
  const max = breakdown.reduce((sum, item) => sum + item.max, 0);

  res.json({ data: { currency: pricing.currency, breakdown, min, max, note: pricing.note } });
});

module.exports = router;
