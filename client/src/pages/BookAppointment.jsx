import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import AppointmentForm from '../components/AppointmentForm.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import '../styles/pages.css';

const BRING = [
  'Previous medical reports and prescriptions',
  'Ultrasound and blood test results (if any)',
  'Semen analysis report for your partner (if any)',
  'A list of current medicines',
];

export default function BookAppointment() {
  usePageTitle('Book an Appointment', 'Book a fertility consultation at MOMFertility IVF Center in under a minute.');
  const [params] = useSearchParams();

  return (
    <>
      <PageHeader
        title="Book an Appointment"
        crumb="Book Appointment"
        subtitle="Choose a time that suits you. Our care coordinator will call to confirm within a few working hours."
      />
      <section className="section">
        <div className="container detail">
          <AppointmentForm defaultService={params.get('service') || ''} />
          <aside className="detail__aside">
            <div className="card">
              <h4>What to bring</h4>
              <ul className="checklist">
                {BRING.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h4>Prefer to talk?</h4>
              <p className="muted">Call us Monday to Saturday, 9:00 AM – 7:00 PM.</p>
              <a href="tel:+910000000000" className="btn btn--ghost btn--block">📞 +91 00000 00000</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
