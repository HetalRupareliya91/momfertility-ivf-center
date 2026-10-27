import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Newsletter from './Newsletter.jsx';
import '../styles/footer.css';

const QUICK_LINKS = [
  ['/about', 'About Us'],
  ['/doctors', 'Our Doctors'],
  ['/success-stories', 'Success Stories'],
  ['/blog', 'Fertility Blog'],
  ['/faq', 'FAQs'],
  ['/ivf-cost-calculator', 'IVF Cost Calculator'],
];

const TREATMENTS = [
  ['/services/ivf', 'IVF'],
  ['/services/icsi', 'ICSI'],
  ['/services/iui', 'IUI'],
  ['/services/egg-freezing', 'Egg Freezing'],
  ['/services/male-infertility', 'Male Infertility'],
  ['/services/pgt', 'Genetic Testing (PGT)'],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand brand--light" aria-label="MOMFertility IVF Center — home">
            <Logo />
            <span className="brand__text">
              <strong>MOMFertility</strong>
              <small>IVF Center</small>
            </span>
          </Link>
          <p>Compassionate, evidence-based fertility care — helping hopeful parents build their families with confidence.</p>
          <Newsletter />
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map(([to, label]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Treatments</h4>
          <ul>
            {TREATMENTS.map(([to, label]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li><span aria-hidden="true">📍</span> Add your clinic address here</li>
            <li><span aria-hidden="true">📞</span> <a href="tel:+910000000000">+91 00000 00000</a></li>
            <li><span aria-hidden="true">✉️</span> <a href="mailto:care@momfertility.in">care@momfertility.in</a></li>
            <li><span aria-hidden="true">🕘</span> Mon–Sat, 9:00 AM – 7:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} MOMFertility IVF Center. All rights reserved.</span>
          <span>Information on this website is for general awareness and does not replace a consultation with a doctor.</span>
        </div>
      </div>
    </footer>
  );
}
