import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { faqs as fallbackFaqs } from '../data/index.js';
import '../styles/pages.css';

export default function FAQ() {
  usePageTitle('FAQs', 'Answers to common questions about IVF, fertility testing, costs and support.');
  const { data } = useFetch('/faqs', fallbackFaqs);
  const faqs = data || [];
  const categories = useMemo(() => ['All', ...new Set(faqs.map((f) => f.category))], [faqs]);
  const [category, setCategory] = useState('All');
  const list = category === 'All' ? faqs : faqs.filter((f) => f.category === category);

  return (
    <>
      <PageHeader title="Frequently Asked Questions" crumb="FAQs" subtitle="Clear answers to the questions we hear most often." />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter questions">
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
          </div>
          <FAQAccordion key={category} items={list} />
          <div className="card center mt-lg">
            <h3>Still have a question?</h3>
            <p className="muted">Our team is happy to help — no question is too small.</p>
            <Link to="/contact" className="btn btn--primary">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
