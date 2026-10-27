import '../styles/cards.css';

const STEPS = [
  { title: 'Consultation', text: 'Meet your specialist, share your history and ask every question.' },
  { title: 'Diagnosis', text: 'Hormone tests, ultrasound and semen analysis to understand the cause.' },
  { title: 'Personalised plan', text: 'A treatment plan, timeline and written cost estimate made for you.' },
  { title: 'Treatment', text: 'Monitoring, procedures and lab work with your care coordinator beside you.' },
  { title: 'Ongoing support', text: 'Pregnancy confirmation, early scans and counselling whatever the outcome.' },
];

export default function ProcessSteps() {
  return (
    <ol className="process">
      {STEPS.map((step, i) => (
        <li className="process__step" key={step.title}>
          <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
