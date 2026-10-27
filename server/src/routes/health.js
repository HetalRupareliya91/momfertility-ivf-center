const { Router } = require('express');

const router = Router();
const startedAt = Date.now();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'momfertility-api',
    uptime: Math.round((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
