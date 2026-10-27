import { Link } from 'react-router-dom';
import '../styles/cards.css';

export default function DoctorCard({ doctor }) {
  return (
    <article className="card doctor-card">
      <div className="doctor-card__avatar" aria-hidden="true">{doctor.initials}</div>
      <h3>{doctor.name}</h3>
      <span className="doctor-card__role">{doctor.role}</span>
      <p className="doctor-card__quals">{doctor.qualifications}</p>
      <div className="doctor-card__meta">
        <span className="tag">{doctor.specialty}</span>
        <span className="tag">{doctor.experience}+ yrs</span>
      </div>
      <p className="doctor-card__bio">{doctor.bio}</p>
      <p className="note">Speaks: {doctor.languages.join(', ')}</p>
      <Link to="/book-appointment" className="btn btn--ghost btn--block">Book consultation</Link>
    </article>
  );
}
