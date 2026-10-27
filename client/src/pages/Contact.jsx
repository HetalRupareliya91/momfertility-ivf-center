import PageHeader from '../components/PageHeader.jsx';
import ClinicInfo from '../components/ClinicInfo.jsx';
import ContactForm from '../components/ContactForm.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import '../styles/pages.css';

export default function Contact() {
  usePageTitle('Contact Us', 'Get in touch with MOMFertility IVF Center — phone, email, address and opening hours.');

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Questions about treatment, costs or your first visit? We are here to help." />
      <section className="section">
        <div className="container contact-grid">
          <ClinicInfo />
          <ContactForm />
        </div>
        <div className="container" style={{ marginTop: 40 }}>
          <div className="map">
            <iframe
              title="MOMFertility IVF Center location"
              src="https://www.google.com/maps?q=MOMFertility%20IVF%20Center&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 32px; align-items: start; }
        .map { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow); aspect-ratio: 21 / 8; background: var(--rose-100); }
        .map iframe { width: 100%; height: 100%; border: 0; display: block; }
        @media (max-width: 992px) { .contact-grid { grid-template-columns: 1fr; } .map { aspect-ratio: 4 / 3; } }
      `}</style>
    </>
  );
}
