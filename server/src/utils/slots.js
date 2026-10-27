// Clinic consultation slots (24h format). Closed on Sundays.
const SLOTS = ['09:30', '10:30', '11:30', '12:30', '14:30', '15:30', '16:30', '17:30'];
const SLOT_CAPACITY = 2; // bookings allowed per slot

const isSunday = (date) => new Date(`${date}T00:00:00`).getDay() === 0;

module.exports = { SLOTS, SLOT_CAPACITY, isSunday };
