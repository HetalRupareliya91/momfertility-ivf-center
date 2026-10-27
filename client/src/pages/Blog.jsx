import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import BlogCard from '../components/BlogCard.jsx';
import Loader from '../components/Loader.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { blog as fallbackPosts } from '../data/index.js';
import '../styles/pages.css';

export default function Blog() {
  usePageTitle('Fertility Blog', 'Expert articles on IVF, fertility health, lifestyle and emotional wellbeing.');
  const { data, loading } = useFetch('/blog', fallbackPosts);
  const posts = useMemo(() => [...(data || [])].sort((a, b) => b.date.localeCompare(a.date)), [data]);
  const categories = useMemo(() => ['All', ...new Set(posts.map((p) => p.category))], [posts]);
  const [category, setCategory] = useState('All');
  const list = category === 'All' ? posts : posts.filter((p) => p.category === category);

  return (
    <>
      <PageHeader title="Fertility Blog" crumb="Blog" subtitle="Trusted, easy-to-read guidance from our doctors and counsellors." />
      <section className="section">
        <div className="container">
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter articles">
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
          {loading && !posts.length ? (
            <Loader />
          ) : (
            <div className="grid grid-3">
              {list.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
