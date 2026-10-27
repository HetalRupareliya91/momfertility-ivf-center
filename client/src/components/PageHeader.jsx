import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, crumb }) {
  return (
    <section className="page-header">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb || title}</span>
        </nav>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
