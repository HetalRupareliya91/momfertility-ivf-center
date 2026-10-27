const { Router } = require('express');
const posts = require('../data/seed/blog.json');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();
const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

// GET /api/blog?category=IVF  (list without full content)
router.get('/', (req, res) => {
  const { category } = req.query;
  const data = (category ? sorted.filter((p) => p.category === category) : sorted).map(
    ({ content, ...summary }) => summary
  );
  res.json({ count: data.length, data });
});

// GET /api/blog/:slug
router.get('/:slug', (req, res, next) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (!post) return next(new HttpError(404, 'Article not found'));
  res.json({ data: post });
});

module.exports = router;
