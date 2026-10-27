import { Link } from 'react-router-dom';
import '../styles/cards.css';

export default function ServiceCard({ service }) {
  return (
    <article className="card service-card">
      <span className="service-card__icon" aria-hidden="true">{service.icon}</span>
      <span className="tag">{service.category}</span>
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <Link to={`/services/${service.slug}`} className="link-arrow" aria-label={`Learn more about ${service.title}`}>
        Learn more <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
