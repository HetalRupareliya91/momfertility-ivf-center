const { Router } = require('express');
const doctors = require('../data/seed/doctors.json');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

// GET /api/doctors?specialty=Andrology
router.get('/', (req, res) => {
  const { specialty } = req.query;
  const data = specialty
    ? doctors.filter((d) => d.specialty.toLowerCase() === String(specialty).toLowerCase())
    : doctors;
  res.json({ count: data.length, data });
});

// GET /api/doctors/:id
router.get('/:id', (req, res, next) => {
  const doctor = doctors.find((d) => d.id === req.params.id);
  if (!doctor) return next(new HttpError(404, 'Doctor not found'));
  res.json({ data: doctor });
});

module.exports = router;
