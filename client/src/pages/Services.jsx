import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import CTABanner from '../components/CTABanner.jsx';
import Loader from '../components/Loader.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { services as fallbackServices } from '../data/index.js';
import '../styles/pages.css';

export default function Services() {
  usePageTitle('Fertility Treatments', 'IVF, ICSI, IUI, egg freezing, PGT, male infertility care and more at MOMFertility IVF Center.');
  const { data, loading } = useFetch('/services', fallbackServices);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const services = data || [];
  const categories = useMemo(() => ['All', ...new Set(services.map((s) => s.category))], [services]);
  const filtered = services.filter((s) => {
    const matchCat = category === 'All' || s.category === category;
    const matchQ = `${s.title} ${s.short}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <PageHeader
        title="Fertility Treatments"
        crumb="Treatments"
        subtitle="Evidence-based treatments, explained clearly — so you can choose the right path with confidence."
      />

      <section className="section">
        <div className="container">
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`chip ${category === c ? 'is-active' : ''}`}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search">
              <span aria-hidden="true">🔎</span>
              <span className="sr-only">Search treatments</span>
              <input type="search" placeholder="Search treatments" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>

          {loading && !services.length ? (
            <Loader />
          ) : filtered.length ? (
            <div className="grid grid-3">
              {filtered.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          ) : (
            <p className="empty">No treatments match your search.</p>
          )}

          <div className="alert alert--info center mt-lg">
            Wondering about costs? Try our <Link to="/ivf-cost-calculator">IVF cost calculator</Link> for an instant estimate.
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
