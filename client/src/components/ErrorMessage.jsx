export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="alert alert--error" role="alert">
      <p style={{ margin: 0 }}>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--ghost" style={{ marginTop: 12 }} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
