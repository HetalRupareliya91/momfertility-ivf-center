const { Router } = require('express');
const faqs = require('../data/seed/faqs.json');

const router = Router();

// GET /api/faqs?category=IVF%20treatment
router.get('/', (req, res) => {
  const { category } = req.query;
  const data = category ? faqs.filter((f) => f.category === category) : faqs;
  const categories = [...new Set(faqs.map((f) => f.category))];
  res.json({ count: data.length, categories, data });
});

module.exports = router;
