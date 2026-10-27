import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CTABanner from '../components/CTABanner.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import '../styles/pages.css';

const VALUES = [
  { icon: '🤍', title: 'Compassion', text: 'We listen first and treat every family with warmth and respect.' },
  { icon: '🔍', title: 'Honesty', text: 'Clear explanations, realistic expectations and transparent costs.' },
  { icon: '🧠', title: 'Evidence', text: 'Treatment decisions guided by current clinical research.' },
  { icon: '🛡️', title: 'Ethics', text: 'Full compliance with the ART (Regulation) Act and ICMR guidelines.' },
];

const FACILITIES = [
  'Dedicated IVF laboratory with controlled air quality',
  'Modern ultrasound and follicle monitoring',
  'Day-care operation theatre for retrieval and endoscopy',
  'Andrology lab for semen analysis and sperm preparation',
  'Private counselling rooms',
  'Secure cryostorage for eggs, sperm and embryos',
];

export default function About() {
  usePageTitle('About Us', 'Learn about MOMFertility IVF Center — our mission, values, team and facilities.');

  return (
    <>
      <PageHeader
        title="About MOMFertility"
        crumb="About"
        subtitle="A fertility center built on one belief: every hopeful parent deserves expert care, honest guidance and genuine kindness."
      />

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>Helping families grow, one story at a time</h2>
            <p>
              MOMFertility IVF Center was founded to make advanced fertility treatment approachable. We know that
              behind every appointment is a couple carrying hope, worry and many questions.
            </p>
            <p>
              Our multidisciplinary team — reproductive medicine specialists, embryologists, andrologists, nurses and
              counsellors — works together on your plan, so you get joined-up care instead of scattered referrals.
            </p>
            <Link to="/doctors" className="btn btn--primary" style={{ marginTop: 8 }}>Meet our doctors</Link>
          </div>
          <div className="split__art" aria-hidden="true">👨‍👩‍👧</div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow="Our Values" title="What guides every decision we make" />
          <div className="grid grid-4">
            {VALUES.map((v) => (
              <div className="card value-card" key={v.title}>
                <span aria-hidden="true">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__art" aria-hidden="true">🏥</div>
          <div>
            <span className="eyebrow">Facilities</span>
            <h2>Everything you need, in one place</h2>
            <p className="muted">Our center is designed for comfort, privacy and the highest laboratory standards.</p>
            <ul className="checklist">
              {FACILITIES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
