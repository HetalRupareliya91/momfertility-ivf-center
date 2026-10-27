const { Router } = require('express');
const store = require('../data/store');
const validate = require('../middleware/validate');
const { isEmail } = require('../utils/validators');

const router = Router();

// POST /api/newsletter
router.post('/', validate({ email: [isEmail, 'Please enter a valid email address.'] }), async (req, res, next) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    if (store.find('subscribers', (s) => s.email === email).length) {
      return res.json({ message: 'You are already subscribed. Thank you!' });
    }
    await store.insert('subscribers', { email });
    res.status(201).json({ message: 'Subscribed! Look out for fertility tips in your inbox.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
