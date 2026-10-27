import { useCallback, useEffect, useState } from 'react';
import '../styles/testimonials.css';

export const initialsOf = (name) =>
  name
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function TestimonialSlider({ items = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback((dir) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [paused, count, go]);

  if (!count) return null;
  const t = items[index % count];

  return (
    <div
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figure className="slider__card" key={t.id} aria-live="polite">
        <div className="slider__stars" aria-label={`${t.rating} out of 5 stars`}>{'★'.repeat(t.rating)}</div>
        <blockquote>“{t.quote}”</blockquote>
        <figcaption>
          <span className="avatar" aria-hidden="true">{initialsOf(t.name)}</span>
          <span>
            <strong>{t.name}</strong>
            <small>{t.treatment} · {t.location}</small>
          </span>
        </figcaption>
      </figure>

      <div className="slider__controls">
        <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous story">‹</button>
        <div className="slider__dots">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.id}
              className={i === index % count ? 'is-active' : ''}
              onClick={() => setIndex(i)}
              aria-label={`Show story ${i + 1}`}
              aria-current={i === index % count}
            />
          ))}
        </div>
        <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next story">›</button>
      </div>
    </div>
  );
}
