import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Loader from '../components/Loader.jsx';
import CTABanner from '../components/CTABanner.jsx';
import NotFound from './NotFound.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { services as allServices } from '../data/index.js';
import '../styles/pages.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const fallback = allServices.find((s) => s.slug === slug);
  const { data: service, loading } = useFetch(`/services/${slug}`, fallback);
  usePageTitle(service?.title || 'Treatment', service?.short);

  if (loading && !service) return <Loader />;
  if (!service) return <NotFound />;

  const related = allServices.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);

  return (
    <>
      <PageHeader title={service.title} subtitle={service.short} crumb={service.title} />

      <section className="section">
        <div className="container detail">
          <article className="detail__body">
            <span className="tag">{service.category}</span>
            <h2 style={{ marginTop: 16 }}>About this treatment</h2>
            <p>{service.description}</p>

            <h3 style={{ marginTop: 32 }}>What is included</h3>
            <ul className="checklist">
              {service.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="alert alert--info" style={{ marginTop: 32 }}>
              Every patient is different. Your doctor will confirm whether this treatment is right for you after
              reviewing your reports.
            </div>
          </article>

          <aside className="detail__aside">
            <div className="card">
              <dl className="facts">
                <div><dt>Typical duration</dt><dd>{service.duration}</dd></div>
                <div><dt>Often recommended for</dt><dd>{service.idealFor}</dd></div>
              </dl>
              <Link to={`/book-appointment?service=${service.slug}`} className="btn btn--primary btn--block" style={{ marginTop: 22 }}>
                Book a consultation
              </Link>
            </div>
            {related.length > 0 && (
              <div className="card">
                <h4>Related treatments</h4>
                <ul className="related">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/services/${r.slug}`}><span aria-hidden="true">{r.icon}</span>{r.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
