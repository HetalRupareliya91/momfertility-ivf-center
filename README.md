# MOMFertility IVF Center 🌸

A fully responsive website (desktop, tablet and mobile) for **MOMFertility IVF Center**, built with a **React** frontend and a **Node.js / Express** backend.

## Features

- **Home** — hero, clinic highlights, treatments, why-us, patient journey, testimonials
- **Treatments** — category filters, search and a detail page for every treatment
- **Doctors** — specialist profiles with specialty filter
- **Success Stories** — outcome chart and patient stories
- **Book Appointment** — live time-slot availability, validation and confirmation
- **IVF Cost Calculator** — instant indicative estimate in INR
- **Blog & FAQs** — articles and an accessible accordion
- **Contact** — contact form, opening hours and map
- Mobile drawer menu, floating WhatsApp button, back-to-top, SEO meta + JSON-LD, skip link
- Works offline from the API: pages fall back to bundled data if the server is down

## Tech stack

| Layer | Tools |
| ----- | ----- |
| Frontend | React 18, React Router 6, Vite 5, plain CSS (custom properties) |
| Backend | Node.js 18+, Express 4, CORS, dotenv |
| Storage | JSON file (`server/data/db.json`) — easy to replace with a database |
| Tests | `node:test` (built in) |

## Project structure

```
momfertility-ivf-center/
├── client/                 # React app (Vite)
│   ├── public/             # favicon, robots.txt, sitemap.xml
│   └── src/
│       ├── api/            # fetch client
│       ├── components/     # Navbar, Footer, Hero, cards, forms…
│       ├── data/           # offline copy of seed data
│       ├── hooks/          # useFetch, useForm, usePageTitle
│       ├── pages/          # route pages
│       └── styles/         # design tokens + component styles
└── server/                 # Express API
    ├── docs/API.md         # endpoint reference
    ├── src/
    │   ├── data/           # seed JSON + file store
    │   ├── middleware/     # logger, errors, validation, rate limit
    │   ├── routes/         # auto-mounted as /api/<file-name>
    │   └── utils/
    └── test/
```

## Getting started

```bash
npm run install:all          # install server + client dependencies
cp server/.env.example server/.env

npm run dev:server           # API on http://localhost:5000
npm run dev:client           # site on http://localhost:5173 (in a second terminal)
```

### Production

```bash
npm run build                # builds client/dist
npm start                    # Express serves the API and the built site on one port
```

### Tests

```bash
npm test
```

## Before going live — replace placeholders

- [ ] Phone, email and address (`Navbar.jsx`, `Footer.jsx`, `ClinicInfo.jsx`, `CTABanner.jsx`, `BookAppointment.jsx`)
- [ ] WhatsApp number (`WhatsAppButton.jsx`)
- [ ] Map query (`Contact.jsx`)
- [ ] Doctors, testimonials and pricing (`server/src/data/seed/*.json`, then copy to `client/src/data/`)
- [ ] Clinic statistics (`Stats.jsx`) and outcome data (`SuccessRateBars.jsx`) — use verified figures only
- [ ] Domain in `index.html`, `robots.txt` and `sitemap.xml`

## API

See [`server/docs/API.md`](server/docs/API.md).

## Team

- [@Hetalrupareliya91](https://github.com/Hetalrupareliya91) — Owner
- [@rajsingh10](https://github.com/rajsingh10) — Collaborator
