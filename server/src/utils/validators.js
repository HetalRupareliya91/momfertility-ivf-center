const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s-]{10,15}$/;

const isNonEmpty = (value, min = 1) => typeof value === 'string' && value.trim().length >= min;
const isEmail = (value) => typeof value === 'string' && EMAIL.test(value.trim());
const isPhone = (value) => typeof value === 'string' && PHONE.test(value.trim());

function isFutureDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T23:59:59`);
  return !Number.isNaN(date.getTime()) && date >= new Date();
}

// Trim and strip angle brackets to keep stored text safe to render
const clean = (value) => (typeof value === 'string' ? value.trim().replace(/[<>]/g, '') : value);

module.exports = { isNonEmpty, isEmail, isPhone, isFutureDate, clean };
