const { Router } = require('express');
const testimonials = require('../data/seed/testimonials.json');

const router = Router();

// GET /api/testimonials?limit=3
router.get('/', (req, res) => {
  const limit = Number.parseInt(req.query.limit, 10);
  const data = Number.isInteger(limit) && limit > 0 ? testimonials.slice(0, limit) : testimonials;
  res.json({ count: data.length, data });
});

module.exports = router;
