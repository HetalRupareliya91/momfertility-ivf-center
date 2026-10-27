import { useEffect, useRef, useState } from 'react';

// Replace with your clinic's verified figures before going live.
const STATS = [
  { value: 10, suffix: '+', label: 'Years of fertility care' },
  { value: 5000, suffix: '+', label: 'Families supported' },
  { value: 15, suffix: '+', label: 'Specialists & embryologists' },
  { value: 24, suffix: '/7', label: 'Patient helpline' },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setN(value);
      return undefined;
    }
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min((t - start) / 1400, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Clinic highlights">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <strong className="stat__value"><Counter value={s.value} suffix={s.suffix} /></strong>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
