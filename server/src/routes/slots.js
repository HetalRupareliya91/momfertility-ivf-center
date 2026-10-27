const { Router } = require('express');
const store = require('../data/store');
const { SLOTS, SLOT_CAPACITY, isSunday } = require('../utils/slots');
const { isFutureDate } = require('../utils/validators');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

// GET /api/slots?date=YYYY-MM-DD
router.get('/', (req, res, next) => {
  const { date } = req.query;
  if (!isFutureDate(date)) return next(new HttpError(400, 'Provide a valid date (YYYY-MM-DD) from today onwards.'));
  if (isSunday(date)) return res.json({ date, closed: true, data: [] });

  const data = SLOTS.map((time) => ({
    time,
    available: store.find('appointments', (a) => a.date === date && a.slot === time).length < SLOT_CAPACITY,
  }));
  res.json({ date, closed: false, data });
});

module.exports = router;
