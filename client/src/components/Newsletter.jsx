import { useState } from 'react';
import { api } from '../api/client.js';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus({ type: 'error', msg: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ type: 'loading', msg: '' });
    try {
      const res = await api('/newsletter', { method: 'POST', body: { email } });
      setStatus({ type: 'success', msg: res.message });
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
  }

  return (
    <form className="newsletter" onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email">Get fertility tips in your inbox</label>
      <div className="newsletter__row">
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button className="btn btn--primary" disabled={status.type === 'loading'}>
          {status.type === 'loading' ? '…' : 'Subscribe'}
        </button>
      </div>
      {status.msg && <p className={`newsletter__msg is-${status.type}`} role="status">{status.msg}</p>}
    </form>
  );
}
