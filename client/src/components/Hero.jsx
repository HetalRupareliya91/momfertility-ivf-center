import { Link } from 'react-router-dom';
import '../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Advanced IVF &amp; Fertility Care</span>
          <h1>
            Turning hope into the <em>joy of parenthood</em>
          </h1>
          <p className="hero__lead">
            At MOMFertility IVF Center, compassionate specialists, a modern embryology lab and a plan built around you
            come together at every step of your journey to parenthood.
          </p>
          <div className="hero__actions">
            <Link to="/book-appointment" className="btn btn--primary btn--lg">Book a Consultation</Link>
            <Link to="/services" className="btn btn--ghost btn--lg">Explore Treatments</Link>
          </div>
          <ul className="hero__trust">
            <li><span aria-hidden="true">✓</span>Personalised treatment plans</li>
            <li><span aria-hidden="true">✓</span>In-house embryology lab</li>
            <li><span aria-hidden="true">✓</span>Transparent pricing</li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__blob"><span className="hero__emoji">👶</span></div>
          <div className="float-card float-card--one"><strong>1:1</strong><span>Care coordinator</span></div>
          <div className="float-card float-card--two"><strong>💗</strong><span>Counselling at every step</span></div>
          <div className="float-card float-card--three"><strong>🔬</strong><span>Advanced IVF lab</span></div>
        </div>
      </div>
    </section>
  );
}
