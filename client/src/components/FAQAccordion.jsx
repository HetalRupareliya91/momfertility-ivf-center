import { useId, useState } from 'react';

export default function FAQAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <div className="accordion">
      {items.map((faq, i) => {
        const isOpen = open === i;
        const id = `${uid}-${i}`;
        return (
          <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={faq.q}>
            <h3>
              <button
                type="button"
                className="accordion__trigger"
                id={`${id}-btn`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {faq.q}
                <span className="accordion__icon" aria-hidden="true">+</span>
              </button>
            </h3>
            <div className="accordion__panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} hidden={!isOpen}>
              <p>{faq.a}</p>
            </div>
          </div>
        );
      })}
      <style>{`
        .accordion { display: grid; gap: 12px; }
        .accordion__item { background: #fff; border: 1px solid var(--line); border-radius: var(--radius); transition: box-shadow .2s; }
        .accordion__item.is-open { box-shadow: var(--shadow-sm); border-color: var(--rose-300); }
        .accordion__item h3 { margin: 0; font-family: var(--font-body); font-size: 1rem; }
        .accordion__trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px;
          padding: 18px 22px; background: none; border: 0; text-align: left; font-weight: 600; color: var(--plum-900); cursor: pointer; }
        .accordion__icon { flex-shrink: 0; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center;
          background: var(--rose-100); color: var(--plum-700); font-size: 1.2rem; transition: transform .3s var(--ease); }
        .accordion__item.is-open .accordion__icon { transform: rotate(45deg); background: var(--plum-700); color: #fff; }
        .accordion__panel { padding: 0 22px 18px; color: var(--muted); animation: fade .3s; }
        .accordion__panel p { margin: 0; }
        @media (max-width: 560px) { .accordion__trigger { padding: 16px; } .accordion__panel { padding: 0 16px 16px; } }
      `}</style>
    </div>
  );
}
