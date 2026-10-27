const { Router } = require('express');
const store = require('../data/store');
const validate = require('../middleware/validate');
const { isNonEmpty, isEmail, isPhone, clean } = require('../utils/validators');

const router = Router();

// POST /api/contact
router.post(
  '/',
  validate({
    name: [(v) => isNonEmpty(v, 2), 'Please enter your name.'],
    email: [isEmail, 'Please enter a valid email address.'],
    phone: [(v) => !v || isPhone(v), 'Please enter a valid phone number.'],
    subject: [(v) => isNonEmpty(v, 3), 'Please add a subject.'],
    message: [(v) => isNonEmpty(v, 10), 'Please write at least 10 characters.'],
  }),
  async (req, res, next) => {
    try {
      const b = req.body;
      await store.insert('contacts', {
        name: clean(b.name),
        email: clean(b.email),
        phone: clean(b.phone || ''),
        subject: clean(b.subject).slice(0, 150),
        message: clean(b.message).slice(0, 2000),
      });
      res.status(201).json({ message: 'Thank you for reaching out. Our team will reply within one working day.' });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
