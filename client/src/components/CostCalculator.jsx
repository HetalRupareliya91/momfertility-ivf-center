import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';
import { pricing as fallbackPricing } from '../data/index.js';

const inr = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function CostCalculator() {
  const { data } = useFetch('/ivf-cost/options', fallbackPricing);
  const p = data || fallbackPricing;
  const [treatment, setTreatment] = useState('ivf');
  const [cycles, setCycles] = useState(1);
  const [addons, setAddons] = useState([]);

  const result = useMemo(() => {
    const base = p.treatments.find((t) => t.id === treatment) || p.treatments[0];
    const items = [
      { label: `${base.label} × ${cycles} cycle${cycles > 1 ? 's' : ''}`, min: base.min * cycles, max: base.max * cycles },
      ...p.addons.filter((a) => addons.includes(a.id)).map(({ label, min, max }) => ({ label, min, max })),
    ];
    return {
      items,
      min: items.reduce((s, i) => s + i.min, 0),
      max: items.reduce((s, i) => s + i.max, 0),
    };
  }, [p, treatment, cycles, addons]);

  const toggle = (id) => setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <div className="calc">
      <div className="card calc__form">
        <h3>1. Choose a treatment</h3>
        <div className="calc__options" role="radiogroup" aria-label="Treatment">
          {p.treatments.map((t) => (
            <button
              type="button"
              key={t.id}
              role="radio"
              aria-checked={treatment === t.id}
              className={`calc__option ${treatment === t.id ? 'is-active' : ''}`}
              onClick={() => setTreatment(t.id)}
            >
              <strong>{t.label}</strong>
              <small>{inr(t.min)} – {inr(t.max)}</small>
            </button>
          ))}
        </div>

        <h3>2. Number of cycles</h3>
        <div className="stepper">
          <button type="button" className="icon-btn" onClick={() => setCycles((c) => Math.max(1, c - 1))} disabled={cycles <= 1} aria-label="Fewer cycles">−</button>
          <output aria-live="polite">{cycles}</output>
          <button type="button" className="icon-btn" onClick={() => setCycles((c) => Math.min(3, c + 1))} disabled={cycles >= 3} aria-label="More cycles">+</button>
        </div>

        <h3>3. Optional add-ons</h3>
        <div className="calc__addons">
          {p.addons.map((a) => (
            <label key={a.id} className={`calc__addon ${addons.includes(a.id) ? 'is-active' : ''}`}>
              <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggle(a.id)} />
              <span>
                <strong>{a.label}</strong>
                <small>{inr(a.min)} – {inr(a.max)}</small>
              </span>
            </label>
          ))}
        </div>
      </div>

      <aside className="card calc__result" aria-live="polite">
        <span className="eyebrow">Estimated cost</span>
        <p className="calc__total">{inr(result.min)} – {inr(result.max)}</p>
        <ul className="calc__breakdown">
          {result.items.map((i) => (
            <li key={i.label}><span>{i.label}</span><span>{inr(i.min)} – {inr(i.max)}</span></li>
          ))}
        </ul>
        <p className="note">{p.note}</p>
        <Link to="/book-appointment" className="btn btn--primary btn--block">Get an exact quote</Link>
      </aside>

      <style>{`
        .calc { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 28px; align-items: start; }
        .calc__form h3 { font-family: var(--font-body); font-size: 1rem; margin: 26px 0 14px; }
        .calc__form h3:first-child { margin-top: 0; }
        .calc__options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .calc__option { text-align: left; padding: 16px; border-radius: var(--radius-sm); border: 1.5px solid var(--line); background: #fff; cursor: pointer; transition: all .2s; }
        .calc__option strong { display: block; color: var(--plum-900); }
        .calc__option small { color: var(--muted); }
        .calc__option.is-active { border-color: var(--plum-500); background: var(--rose-100); box-shadow: 0 0 0 3px rgba(142,62,143,.12); }
        .stepper { display: inline-flex; align-items: center; gap: 18px; }
        .stepper output { font-size: 1.4rem; font-weight: 600; min-width: 24px; text-align: center; }
        .calc__addons { display: grid; gap: 10px; }
        .calc__addon { display: flex; gap: 12px; align-items: center; padding: 14px 16px; border: 1.5px solid var(--line); border-radius: var(--radius-sm); cursor: pointer; transition: all .2s; }
        .calc__addon input { width: 18px; height: 18px; accent-color: var(--plum-500); }
        .calc__addon strong { display: block; font-weight: 500; }
        .calc__addon small { color: var(--muted); }
        .calc__addon.is-active { border-color: var(--plum-500); background: var(--rose-100); }
        .calc__result { position: sticky; top: calc(var(--nav-h) + 24px); }
        .calc__total { font-family: var(--font-head); font-size: clamp(1.5rem, 3vw, 2rem); color: var(--plum-700); margin: 0 0 18px; }
        .calc__breakdown { list-style: none; padding: 0; margin: 0 0 18px; display: grid; gap: 10px; font-size: .9rem; }
        .calc__breakdown li { display: flex; justify-content: space-between; gap: 12px; padding-bottom: 10px; border-bottom: 1px dashed var(--line); }
        .calc__breakdown li span:last-child { text-align: right; color: var(--muted); }
        @media (max-width: 900px) { .calc { grid-template-columns: 1fr; } .calc__result { position: static; } }
        @media (max-width: 420px) { .calc__options { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
