# MOMFertility API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/health` | Service status |
| GET | `/services` | Treatments (`?category=`, `?q=`) |
| GET | `/services/:slug` | Single treatment |
| GET | `/doctors` | Doctors (`?specialty=`) |
| GET | `/doctors/:id` | Single doctor |
| GET | `/testimonials` | Patient stories (`?limit=`) |
| GET | `/faqs` | FAQs and categories (`?category=`) |
| GET | `/blog` | Article summaries (`?category=`) |
| GET | `/blog/:slug` | Full article |
| GET | `/slots?date=YYYY-MM-DD` | Appointment availability |
| POST | `/appointments` | Book appointment |
| POST | `/contact` | Contact message |
| POST | `/newsletter` | Newsletter signup |
| GET | `/ivf-cost/options` | Pricing table |
| POST | `/ivf-cost` | Cost estimate |

## Errors

```json
{ "error": { "message": "Please correct the highlighted fields.", "details": { "phone": "Please enter a valid phone number." } } }
```

Status codes: `400` bad input, `404` not found, `409` slot full, `422` validation failed, `429` too many requests.

## Example — book an appointment

```http
POST /api/appointments
Content-Type: application/json

{
  "name": "Priya Shah",
  "phone": "+91 98765 43210",
  "email": "priya@example.com",
  "service": "ivf",
  "date": "2026-12-01",
  "slot": "10:30",
  "message": "First consultation"
}
```
