const HOURS = [
  ['Monday – Friday', '9:00 AM – 7:00 PM'],
  ['Saturday', '9:00 AM – 5:00 PM'],
  ['Sunday', 'Closed (emergencies on call)'],
];

export default function ClinicInfo() {
  return (
    <div className="card clinic-info">
      <h3>Visit our center</h3>
      <ul className="clinic-info__list">
        <li><span aria-hidden="true">📍</span><div><strong>Address</strong><p>Add your clinic address here</p></div></li>
        <li><span aria-hidden="true">📞</span><div><strong>Phone</strong><p><a href="tel:+910000000000">+91 00000 00000</a></p></div></li>
        <li><span aria-hidden="true">✉️</span><div><strong>Email</strong><p><a href="mailto:care@momfertility.in">care@momfertility.in</a></p></div></li>
      </ul>
      <h4>Opening hours</h4>
      <table className="hours">
        <tbody>
          {HOURS.map(([day, time]) => (
            <tr key={day}><th scope="row">{day}</th><td>{time}</td></tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .clinic-info__list { list-style: none; padding: 0; margin: 0 0 24px; display: grid; gap: 18px; }
        .clinic-info__list li { display: flex; gap: 14px; }
        .clinic-info__list li > span { width: 44px; height: 44px; flex-shrink: 0; border-radius: 12px; display: grid; place-items: center; background: var(--rose-100); }
        .clinic-info__list p { margin: 0; color: var(--muted); }
        .hours { width: 100%; border-collapse: collapse; font-size: .92rem; }
        .hours th, .hours td { padding: 10px 0; border-bottom: 1px solid var(--line); text-align: left; }
        .hours th { font-weight: 500; }
        .hours td { text-align: right; color: var(--muted); }
      `}</style>
    </div>
  );
}
