export default function SectionTitle({ eyebrow, title, text, align = 'center' }) {
  return (
    <div className={`section-title ${align === 'left' ? 'section-title--left' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
