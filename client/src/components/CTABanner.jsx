import { Link } from 'react-router-dom';
import '../styles/cta.css';

export default function CTABanner({
  title = 'Your journey to parenthood starts with one conversation',
  text = 'Speak with our fertility specialists and get a clear, personalised plan — with honest guidance at every step.',
}) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__inner">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta__actions">
            <Link to="/book-appointment" className="btn btn--light btn--lg">Book Appointment</Link>
            <a href="tel:+910000000000" className="btn btn--outline-light btn--lg">Call Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
