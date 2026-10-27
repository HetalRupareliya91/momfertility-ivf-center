export default function FormField({ label, name, error, hint, required, children }) {
  return (
    <div className={`field ${error ? 'is-invalid' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true" style={{ color: 'var(--rose-500)' }}> *</span>}
      </label>
      {children}
      {hint && !error && <small className="field__hint">{hint}</small>}
      {error && <small className="field__error" role="alert">{error}</small>}
    </div>
  );
}
