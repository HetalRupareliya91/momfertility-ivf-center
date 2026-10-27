import { Link } from 'react-router-dom';

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function BlogCard({ post }) {
  return (
    <article className="card blog-card">
      <div className="blog-card__cover" aria-hidden="true">{post.emoji}</div>
      <div className="blog-card__meta">
        <span className="tag">{post.category}</span>
        <span>{formatDate(post.date)} · {post.readTime} min read</span>
      </div>
      <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <Link to={`/blog/${post.slug}`} className="link-arrow" aria-label={`Read: ${post.title}`}>
        Read article <span aria-hidden="true">→</span>
      </Link>
      <style>{`
        .blog-card { padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 100%; transition: transform .3s var(--ease), box-shadow .3s; }
        .blog-card:hover { transform: translateY(-5px); box-shadow: var(--shadow); }
        .blog-card > *:not(.blog-card__cover) { margin-left: 24px; margin-right: 24px; }
        .blog-card__cover { aspect-ratio: 16 / 9; display: grid; place-items: center; font-size: 3.4rem;
          background: linear-gradient(135deg, var(--rose-100), var(--teal-100)); margin-bottom: 18px; }
        .blog-card__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: .8rem; color: var(--muted); margin-bottom: 10px; }
        .blog-card h3 a { color: var(--plum-900); }
        .blog-card h3 a:hover { color: var(--rose-500); }
        .blog-card p { color: var(--muted); font-size: .93rem; flex: 1; }
        .blog-card .link-arrow { margin-bottom: 24px; }
      `}</style>
    </article>
  );
}
