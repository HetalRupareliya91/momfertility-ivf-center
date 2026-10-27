import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import PageHeader from '../components/PageHeader.jsx';
import CTABanner from '../components/CTABanner.jsx';
import BlogCard, { formatDate } from '../components/BlogCard.jsx';
import NotFound from './NotFound.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { blog as allPosts } from '../data/index.js';
import '../styles/pages.css';

export default function BlogPost() {
  const { slug } = useParams();
  const fallback = allPosts.find((p) => p.slug === slug);
  const { data: post, loading } = useFetch(`/blog/${slug}`, fallback);
  usePageTitle(post?.title || 'Article', post?.excerpt);

  if (loading && !post) return <Loader />;
  if (!post) return <NotFound />;

  const more = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHeader title={post.title} crumb="Blog" subtitle={`${post.author} · ${formatDate(post.date)} · ${post.readTime} min read`} />
      <section className="section">
        <article className="container" style={{ maxWidth: 760 }}>
          <span className="tag">{post.category}</span>
          <p style={{ fontSize: '1.2rem', color: 'var(--plum-700)', marginTop: 20 }}>{post.excerpt}</p>
          {post.content.map((para, i) => (
            <p key={i} style={{ fontSize: '1.05rem' }}>{para}</p>
          ))}
          <div className="alert alert--info" style={{ marginTop: 32 }}>
            This article is for general information. Please speak to a doctor about your personal situation.
          </div>
          <Link to="/blog" className="link-arrow"><span aria-hidden="true">←</span> Back to all articles</Link>
        </article>
      </section>

      {more.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <h2 className="center" style={{ marginBottom: 36 }}>More to read</h2>
            <div className="grid grid-3">
              {more.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <div className="section" style={{ paddingBottom: 0 }} />
      <CTABanner />
    </>
  );
}
