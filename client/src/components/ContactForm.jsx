import useForm from '../hooks/useForm.js';
import FormField from './FormField.jsx';
import { api } from '../api/client.js';

function validate(v) {
  const e = {};
  if (!v.name || v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.phone && !/^\+?[0-9\s-]{10,15}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!v.subject || v.subject.trim().length < 3) e.subject = 'Please add a subject.';
  if (!v.message || v.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  return e;
}

export default function ContactForm() {
  const { values, errors, status, message, handleChange, handleSubmit, reset } = useForm(
    { name: '', email: '', phone: '', subject: '', message: '' },
    validate
  );

  const submit = handleSubmit(async (payload) => {
    const res = await api('/contact', { method: 'POST', body: payload });
    return res.message;
  });

  if (status === 'success') {
    return (
      <div className="card center" role="status">
        <div style={{ fontSize: '3rem' }} aria-hidden="true">💌</div>
        <h3>Message sent</h3>
        <p className="muted">{message}</p>
        <button type="button" className="btn btn--ghost" onClick={reset}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="form card" onSubmit={submit} noValidate>
      <h3 style={{ margin: 0 }}>Send us a message</h3>
      <div className="form-row">
        <FormField label="Name" name="name" error={errors.name} required>
          <input id="name" name="name" value={values.name} onChange={handleChange} autoComplete="name" />
        </FormField>
        <FormField label="Email" name="email" error={errors.email} required>
          <input id="email" name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" />
        </FormField>
      </div>
      <div className="form-row">
        <FormField label="Phone" name="phone" error={errors.phone} hint="Optional">
          <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" />
        </FormField>
        <FormField label="Subject" name="subject" error={errors.subject} required>
          <input id="subject" name="subject" value={values.subject} onChange={handleChange} />
        </FormField>
      </div>
      <FormField label="Message" name="message" error={errors.message} required>
        <textarea id="message" name="message" rows="5" maxLength={2000} value={values.message} onChange={handleChange} />
      </FormField>
      {status === 'error' && message && <div className="alert alert--error" role="alert">{message}</div>}
      <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
