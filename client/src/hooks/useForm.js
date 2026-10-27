import { useState } from 'react';

export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    const found = validate ? validate(values) : {};
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('error');
      setMessage('Please correct the highlighted fields.');
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    setMessage('');
    try {
      const msg = await onSubmit(values);
      setStatus('success');
      setMessage(msg || '');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong. Please try again.');
      if (err.details) setErrors(err.details);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
    setMessage('');
  };

  return { values, errors, status, message, handleChange, setField, handleSubmit, reset };
}
