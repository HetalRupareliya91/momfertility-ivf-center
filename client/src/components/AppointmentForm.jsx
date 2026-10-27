import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm.js';
import useFetch from '../hooks/useFetch.js';
import FormField from './FormField.jsx';
import { api } from '../api/client.js';
import { services as fallbackServices } from '../data/index.js';

const ALL_SLOTS = ['09:30', '10:30', '11:30', '12:30', '14:30', '15:30', '16:30', '17:30'];

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
const isSunday = (iso) => new Date(`${iso}T00:00:00`).getDay() === 0;
const formatTime = (t) => {
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

function validate(v) {
  const e = {};
  if (!v.name || v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^\+?[0-9\s-]{10,15}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!v.service) e.service = 'Please choose a treatment.';
  if (!v.date) e.date = 'Please choose a date.';
  else if (v.date < todayISO()) e.date = 'Please choose a date from today onwards.';
  else if (isSunday(v.date)) e.date = 'We are closed on Sundays. Please pick another day.';
  if (!v.slot) e.slot = 'Please choose a time slot.';
  if (!v.consent) e.consent = 'Please agree so that we can contact you.';
  return e;
}

export default function AppointmentForm({ defaultService = '' }) {
  const { data: services } = useFetch('/services', fallbackServices);
  const { values, errors, status, message, handleChange, setField, handleSubmit, reset } = useForm(
    { name: '', phone: '', email: '', service: defaultService, date: '', slot: '', message: '', consent: false },
    validate
  );
  const [slots, setSlots] = useState([]);
  const [slotState, setSlotState] = useState('idle'); // idle | loading | ready | closed
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!values.date || values.date < todayISO()) {
      setSlots([]);
      setSlotState('idle');
      return undefined;
    }
    if (isSunday(values.date)) {
      setSlots([]);
      setSlotState('closed');
      return undefined;
    }
    let active = true;
    setSlotState('loading');
    api(`/slots?date=${values.date}`)
      .then((res) => {
        if (!active) return;
        setSlots(res.closed ? [] : res.data);
        setSlotState(res.closed ? 'closed' : 'ready');
      })
      .catch(() => {
        if (!active) return;
        setSlots(ALL_SLOTS.map((time) => ({ time, available: true })));
        setSlotState('ready');
      });
    return () => {
      active = false;
    };
  }, [values.date]);

  useEffect(() => {
    if (values.slot && !slots.some((s) => s.time === values.slot && s.available)) setField('slot', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  const submit = handleSubmit(async ({ consent, ...payload }) => {
    const res = await api('/appointments', { method: 'POST', body: payload });
    setBooking({ ...res.data, service: (services || []).find((s) => s.slug === payload.service)?.title });
    return res.message;
  });

  if (status === 'success' && booking) {
    return (
      <div className="card booking-success" role="status">
        <div style={{ fontSize: '3rem' }} aria-hidden="true">🎉</div>
        <h3>Appointment request received</h3>
        <p className="muted">{message}</p>
        <dl className="facts" style={{ textAlign: 'left', margin: '24px 0' }}>
          <div><dt>Treatment</dt><dd>{booking.service}</dd></div>
          <div>
            <dt>Date</dt>
            <dd>
              {new Date(`${booking.date}T00:00:00`).toLocaleDateString('en-IN', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </dd>
          </div>
          <div><dt>Time</dt><dd>{formatTime(booking.slot)}</dd></div>
          <div><dt>Reference</dt><dd>{booking.id.slice(0, 8).toUpperCase()}</dd></div>
        </dl>
        <button type="button" className="btn btn--ghost" onClick={() => { reset(); setBooking(null); }}>
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form className="form card" onSubmit={submit} noValidate>
      <div className="form-row">
        <FormField label="Full name" name="name" error={errors.name} required>
          <input id="name" name="name" value={values.name} onChange={handleChange} autoComplete="name" aria-invalid={!!errors.name} />
        </FormField>
        <FormField label="Phone number" name="phone" error={errors.phone} required>
          <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="+91 98765 43210" value={values.phone}
            onChange={handleChange} autoComplete="tel" aria-invalid={!!errors.phone} />
        </FormField>
      </div>

      <div className="form-row">
        <FormField label="Email" name="email" error={errors.email} hint="Optional — for your confirmation">
          <input id="email" name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" aria-invalid={!!errors.email} />
        </FormField>
        <FormField label="Treatment" name="service" error={errors.service} required>
          <select id="service" name="service" value={values.service} onChange={handleChange} aria-invalid={!!errors.service}>
            <option value="">Select a treatment</option>
            {(services || []).map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Preferred date" name="date" error={errors.date} hint="Monday to Saturday" required>
        <input id="date" name="date" type="date" min={todayISO()} value={values.date} onChange={handleChange} aria-invalid={!!errors.date} />
      </FormField>

      <fieldset className={`field ${errors.slot ? 'is-invalid' : ''}`}>
        <legend>Preferred time <span aria-hidden="true" style={{ color: 'var(--rose-500)' }}>*</span></legend>
        {slotState === 'idle' && <p className="field__hint">Choose a date to see available times.</p>}
        {slotState === 'loading' && <p className="field__hint">Checking availability…</p>}
        {slotState === 'closed' && <p className="field__hint">The clinic is closed on Sundays.</p>}
        {slotState === 'ready' && (
          <div className="slots">
            {slots.map((s) => (
              <label key={s.time} className={`slot ${values.slot === s.time ? 'is-selected' : ''} ${s.available ? '' : 'is-disabled'}`}>
                <input type="radio" name="slot" value={s.time} checked={values.slot === s.time} onChange={handleChange} disabled={!s.available} />
                {formatTime(s.time)}
              </label>
            ))}
          </div>
        )}
        {errors.slot && <small className="field__error" role="alert">{errors.slot}</small>}
      </fieldset>

      <FormField label="Anything you would like us to know?" name="message" error={errors.message}>
        <textarea id="message" name="message" rows="4" maxLength={1000} value={values.message} onChange={handleChange}
          placeholder="e.g. trying to conceive for 2 years, previous treatments…" />
      </FormField>

      <label className={`checkbox ${errors.consent ? 'is-invalid' : ''}`}>
        <input type="checkbox" name="consent" checked={values.consent} onChange={handleChange} />
        <span>I agree to be contacted by MOMFertility IVF Center about my appointment.</span>
      </label>
      {errors.consent && <small className="field__error" role="alert">{errors.consent}</small>}

      {status === 'error' && message && <div className="alert alert--error" role="alert">{message}</div>}

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Booking…' : 'Request Appointment'}
      </button>

      <style>{`
        .slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 4px; }
        .slot { position: relative; text-align: center; padding: 10px 6px; border: 1.5px solid var(--line); border-radius: var(--radius-sm);
          cursor: pointer; font-size: .9rem; font-weight: 500; background: #fff; transition: all .2s; }
        .slot input { position: absolute; opacity: 0; pointer-events: none; }
        .slot:hover { border-color: var(--rose-300); }
        .slot:focus-within { outline: 2px solid var(--plum-500); outline-offset: 2px; }
        .slot.is-selected { background: var(--plum-700); border-color: var(--plum-700); color: #fff; }
        .slot.is-disabled { opacity: .4; cursor: not-allowed; text-decoration: line-through; }
        .booking-success { text-align: center; }
        @media (max-width: 480px) { .slots { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </form>
  );
}
