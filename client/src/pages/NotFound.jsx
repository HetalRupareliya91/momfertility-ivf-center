import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container center" style={{ maxWidth: 620 }}>
        <p style={{ fontSize: '4rem', margin: 0 }} aria-hidden="true">🌸</p>
        <h1>Page not found</h1>
        <p className="muted">The page you are looking for may have moved. Let us help you find your way.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          <Link to="/" className="btn btn--primary">Back to Home</Link>
          <Link to="/contact" className="btn btn--ghost">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
