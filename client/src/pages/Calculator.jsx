import PageHeader from '../components/PageHeader.jsx';
import CostCalculator from '../components/CostCalculator.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

export default function Calculator() {
  usePageTitle('IVF Cost Calculator', 'Get an instant, indicative estimate for IVF, ICSI, IUI and egg freezing at MOMFertility IVF Center.');

  return (
    <>
      <PageHeader
        title="IVF Cost Calculator"
        subtitle="Get an instant, indicative estimate. We always share a detailed written quote after your consultation."
      />
      <section className="section">
        <div className="container">
          <CostCalculator />
        </div>
      </section>
    </>
  );
}
