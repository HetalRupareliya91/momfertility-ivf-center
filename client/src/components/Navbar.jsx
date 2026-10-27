import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import '../styles/navbar.css';

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Treatments' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/success-stories', label: 'Success Stories' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="topbar">
        <div className="container topbar__inner">
          <span>📞 <a href="tel:+910000000000">+91 00000 00000</a></span>
          <span>🕘 Mon–Sat · 9:00 AM – 7:00 PM</span>
          <span>✉️ <a href="mailto:care@momfertility.in">care@momfertility.in</a></span>
        </div>
      </div>

      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="MOMFertility IVF Center — home">
          <Logo />
          <span className="brand__text">
            <strong>MOMFertility</strong>
            <small>IVF Center</small>
          </span>
        </Link>

        <ul id="primary-menu" className={`nav-links ${open ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end}>{link.label}</NavLink>
            </li>
          ))}
          <li className="nav-links__cta">
            <Link to="/book-appointment" className="btn btn--primary">Book Appointment</Link>
          </li>
        </ul>

        <Link to="/book-appointment" className="btn btn--primary nav-cta">Book Appointment</Link>

        <button
          type="button"
          className={`hamburger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}
