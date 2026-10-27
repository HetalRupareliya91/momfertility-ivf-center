import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import DoctorCard from '../components/DoctorCard.jsx';
import CTABanner from '../components/CTABanner.jsx';
import Loader from '../components/Loader.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { doctors as fallbackDoctors } from '../data/index.js';
import '../styles/pages.css';

export default function Doctors() {
  usePageTitle('Our Doctors', 'Meet the fertility specialists, embryologists and surgeons at MOMFertility IVF Center.');
  const { data, loading } = useFetch('/doctors', fallbackDoctors);
  const [specialty, setSpecialty] = useState('All');

  const doctors = data || [];
  const specialties = useMemo(() => ['All', ...new Set(doctors.map((d) => d.specialty))], [doctors]);
  const list = specialty === 'All' ? doctors : doctors.filter((d) => d.specialty === specialty);

  return (
    <>
      <PageHeader
        title="Meet Our Doctors"
        crumb="Doctors"
        subtitle="A multidisciplinary team that plans your care together — from diagnosis to delivery."
      />
      <section className="section">
        <div className="container">
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by specialty">
              {specialties.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`chip ${specialty === s ? 'is-active' : ''}`}
                  onClick={() => setSpecialty(s)}
                  aria-pressed={specialty === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {loading && !doctors.length ? (
            <Loader />
          ) : (
            <div className="grid grid-4">
              {list.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          )}
        </div>
      </section>
      <CTABanner title="Not sure which specialist to see?" text="Call us and our care coordinator will match you with the right doctor." />
    </>
  );
}
