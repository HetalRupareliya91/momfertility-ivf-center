import { useEffect, useRef, useState } from 'react';

// Placeholder figures — replace with your clinic's verified, audited outcome data before going live.
const OUTCOMES = [
  { group: 'Under 35', rate: 55 },
  { group: '35 – 37', rate: 45 },
  { group: '38 – 40', rate: 32 },
  { group: '41 – 42', rate: 18 },
  { group: 'Over 42', rate: 8 },
];

export default function SuccessRateBars() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="card rates" ref={ref}>
      <h3>Clinical pregnancy rate per embryo transfer, by age</h3>
      <ul className="rates__list">
        {OUTCOMES.map((o) => (
          <li key={o.group}>
            <span className="rates__label">{o.group}</span>
            <span className="rates__track" role="img" aria-label={`${o.group}: ${o.rate}%`}>
              <span className="rates__bar" style={{ width: visible ? `${o.rate}%` : 0 }} />
            </span>
            <strong>{o.rate}%</strong>
          </li>
        ))}
      </ul>
      <p className="note">Indicative figures. Individual outcomes depend on age, diagnosis and embryo quality.</p>
      <style>{`
        .rates h3 { margin-bottom: 24px; }
        .rates__list { list-style: none; padding: 0; margin: 0 0 16px; display: grid; gap: 16px; }
        .rates__list li { display: grid; grid-template-columns: 90px 1fr 48px; gap: 14px; align-items: center; font-size: .92rem; }
        .rates__track { height: 14px; background: var(--rose-100); border-radius: 999px; overflow: hidden; }
        .rates__bar { display: block; height: 100%; background: var(--grad); border-radius: 999px; transition: width 1.2s var(--ease); }
        .rates__list strong { color: var(--plum-700); text-align: right; }
        @media (max-width: 480px) { .rates__list li { grid-template-columns: 70px 1fr 40px; gap: 10px; } }
      `}</style>
    </div>
  );
}
