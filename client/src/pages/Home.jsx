import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ProcessSteps from '../components/ProcessSteps.jsx';
import TestimonialSlider from '../components/TestimonialSlider.jsx';
import CTABanner from '../components/CTABanner.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { services as fallbackServices, testimonials as fallbackTestimonials } from '../data/index.js';
import '../styles/home.css';

const WHY = [
  { icon: '🔬', title: 'Advanced IVF laboratory', text: 'Controlled lab environment, blastocyst culture and vitrification.' },
  { icon: '👩‍⚕️', title: 'Experienced specialists', text: 'Reproductive medicine, embryology, andrology and surgery in one team.' },
  { icon: '📋', title: 'Personalised protocols', text: 'Treatment planned around your age, reports and goals.' },
  { icon: '💗', title: 'Emotional support', text: 'Counselling for you and your partner throughout treatment.' },
  { icon: '💰', title: 'Transparent pricing', text: 'Written estimates up front, with no hidden charges.' },
  { icon: '🔒', title: 'Privacy & dignity', text: 'Confidential care that follows the ART (Regulation) Act.' },
];

export default function Home() {
  usePageTitle(
    'IVF & Fertility Treatment',
    'MOMFertility IVF Center offers IVF, ICSI, IUI, egg freezing and fertility care with compassionate specialists and transparent pricing.'
  );
  const { data: services } = useFetch('/services', fallbackServices);
  const { data: testimonials } = useFetch('/testimonials', fallbackTestimonials);

  return (
    <>
      <Hero />
      <Stats />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Our Treatments"
            title="Complete fertility care under one roof"
            text="From your first assessment to advanced IVF, every treatment is planned around you."
          />
          <div className="grid grid-3">
            {(services || []).slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="center mt-lg">
            <Link to="/services" className="btn btn--ghost">View all treatments</Link>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container why">
          <div>
            <SectionTitle
              align="left"
              eyebrow="Why MOMFertility"
              title="Science-led care with a human touch"
              text="We combine evidence-based medicine with warmth and honesty, so you always know where you stand."
            />
            <Link to="/about" className="btn btn--primary">About our center</Link>
          </div>
          <div className="why__grid">
            {WHY.map((item) => (
              <div className="why__item" key={item.title}>
                <span aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Your Journey" title="A clear path, one gentle step at a time" />
          <ProcessSteps />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow="Success Stories" title="Families who trusted us" />
          <TestimonialSlider items={testimonials || []} />
          <div className="center mt-lg">
            <Link to="/success-stories" className="btn btn--ghost">Read more stories</Link>
          </div>
        </div>
      </section>

      <div className="section" style={{ paddingBottom: 0 }} />
      <CTABanner />
    </>
  );
}
