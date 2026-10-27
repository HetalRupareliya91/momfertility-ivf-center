export default function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="mf-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8e3e8f" />
          <stop offset="1" stopColor="#e0607e" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#mf-logo-grad)" />
      <path d="M24 36s-11-6.6-11-14.2A6.1 6.1 0 0 1 24 18a6.1 6.1 0 0 1 11 3.8C35 29.4 24 36 24 36z" fill="#fff" />
      <circle cx="24" cy="25" r="3.2" fill="#e0607e" />
    </svg>
  );
}
