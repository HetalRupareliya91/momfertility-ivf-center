const { Router } = require('express');
const services = require('../data/seed/services.json');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

// GET /api/services?category=Diagnostics&q=ivf
router.get('/', (req, res) => {
  const { category, q } = req.query;
  let data = services;
  if (category) data = data.filter((s) => s.category === category);
  if (q) {
    const term = String(q).toLowerCase();
    data = data.filter((s) => `${s.title} ${s.short} ${s.category}`.toLowerCase().includes(term));
  }
  res.json({ count: data.length, data });
});

// GET /api/services/:slug
router.get('/:slug', (req, res, next) => {
  const service = services.find((s) => s.slug === req.params.slug);
  if (!service) return next(new HttpError(404, 'Treatment not found'));
  res.json({ data: service });
});

module.exports = router;
