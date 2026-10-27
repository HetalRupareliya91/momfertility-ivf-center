import PageHeader from '../components/PageHeader.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import SuccessRateBars from '../components/SuccessRateBars.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { initialsOf } from '../components/TestimonialSlider.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { testimonials as fallbackTestimonials } from '../data/index.js';
import '../styles/pages.css';
import '../styles/testimonials.css';

export default function SuccessStories() {
  usePageTitle('Success Stories', 'Real stories from families who started their journey to parenthood at MOMFertility IVF Center.');
  const { data } = useFetch('/testimonials', fallbackTestimonials);
  const stories = data || [];

  return (
    <>
      <PageHeader
        title="Success Stories"
        subtitle="Every family's path is different. These are a few of the journeys we have been honoured to share."
      />

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Outcomes</span>
            <h2>Realistic expectations, openly shared</h2>
            <p className="muted">
              Age is the single biggest factor in IVF success. We share outcome data openly so that you can make
              informed decisions — and your doctor will discuss your personal chances at consultation.
            </p>
          </div>
          <SuccessRateBars />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow="In their words" title="Stories from our families" />
          <div className="grid grid-3">
            {stories.map((t) => (
              <figure className="card story-card" key={t.id}>
                <div className="slider__stars" aria-label={`${t.rating} out of 5 stars`}>{'★'.repeat(t.rating)}</div>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span className="avatar" aria-hidden="true">{initialsOf(t.name)}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.treatment} · {t.location}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="note center mt-lg">Names shared with permission. Photos withheld for privacy.</p>
        </div>
      </section>

      <div className="section" style={{ paddingBottom: 0 }} />
      <CTABanner title="Ready to write your own story?" />
    </>
  );
}
