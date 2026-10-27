const { Router } = require('express');
const store = require('../data/store');
const validate = require('../middleware/validate');
const services = require('../data/seed/services.json');
const { HttpError } = require('../middleware/errorHandler');
const { SLOTS, SLOT_CAPACITY, isSunday } = require('../utils/slots');
const { isNonEmpty, isEmail, isPhone, isFutureDate, clean } = require('../utils/validators');

const router = Router();

// POST /api/appointments
router.post(
  '/',
  validate({
    name: [(v) => isNonEmpty(v, 2), 'Please enter your full name.'],
    phone: [isPhone, 'Please enter a valid phone number.'],
    email: [(v) => !v || isEmail(v), 'Please enter a valid email address.'],
    service: [(v) => services.some((s) => s.slug === v), 'Please choose a treatment.'],
    date: [(v) => isFutureDate(v) && !isSunday(v), 'Please choose a date from today onwards (Monday to Saturday).'],
    slot: [(v) => SLOTS.includes(v), 'Please choose an available time slot.'],
  }),
  async (req, res, next) => {
    try {
      const b = req.body;
      const booked = store.find('appointments', (a) => a.date === b.date && a.slot === b.slot).length;
      if (booked >= SLOT_CAPACITY) {
        return next(new HttpError(409, 'That time was just booked. Please choose another slot.', { slot: 'This slot is full.' }));
      }

      const appointment = await store.insert('appointments', {
        name: clean(b.name),
        phone: clean(b.phone),
        email: clean(b.email || ''),
        service: b.service,
        date: b.date,
        slot: b.slot,
        message: clean(b.message || '').slice(0, 1000),
        status: 'pending',
      });

      res.status(201).json({
        message: 'Thank you! Our care coordinator will call you shortly to confirm your appointment.',
        data: { id: appointment.id, date: appointment.date, slot: appointment.slot, status: appointment.status },
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
