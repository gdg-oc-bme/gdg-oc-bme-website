# GDG on Campus BME - Official Platform

The official web platform for Google Developer Groups on Campus at the Budapest University of Technology and Economics. Built with Next.js and Spring Boot.

## Quick Start

You need Java 21 and Node.js 18+ installed.

**1. Start the backend:**

```bash
cd backend
./mvnw spring-boot:run
```

The API runs at http://localhost:8080. A SQLite database file (`gdg.db`) is created automatically with seed data. No external database setup needed.

**2. Start the frontend:**

```bash
cd frontend
npm install
npm run dev
```

The site runs at http://localhost:3000.

That is it. Two terminals, two commands, and you are running.

## Admin Access

Go to http://localhost:3000/admin and log in with:

- Email: `admin@gdgoc.bme.hu`
- Password: `admin123`

From there you can create, edit, and delete events, articles, team members, projects, and opportunities.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | Java 21, Spring Boot 3.3, Spring Security, JWT |
| Database | SQLite (file-based, zero setup) |
| API Style | REST, JSON |

## Project Structure

```
gdg-oc-bme-website/
├── backend/                    # Spring Boot API
│   ├── src/main/java/.../gdgbmewebsite/
│   │   ├── config/            # AdminInitializer (seeds admin user)
│   │   ├── controller/        # REST endpoints
│   │   ├── dto/               # Login request/response objects
│   │   ├── entity/            # JPA entities
│   │   ├── exception/         # GlobalExceptionHandler + ResourceNotFoundException
│   │   ├── jpa/               # Spring Data repositories
│   │   └── security/          # JWT auth filter, JwtUtil, SecurityConfig
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql           # Seed data for events, team, articles, etc.
│   └── pom.xml
├── frontend/                   # Next.js app
│   ├── src/
│   │   ├── app/               # Pages (App Router)
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── events/        # Events listing
│   │   │   ├── team/          # Team showcase
│   │   │   ├── projects/      # Projects gallery
│   │   │   ├── blog/          # Blog + [id] detail page
│   │   │   ├── opportunities/ # Internship board
│   │   │   └── admin/         # Admin dashboard with CRUD
│   │   ├── components/        # Navbar, Footer, ChatWidget, cards
│   │   └── lib/
│   │       └── api.ts         # API helper (fetch, JWT token management)
│   └── package.json
└── README.md
```

## API Endpoints

All GET endpoints are public (no auth needed). POST, PUT, DELETE require a JWT token from the admin login.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login, returns JWT |
| GET | `/api/events` | List all events |
| GET | `/api/events/{id}` | Get event by ID |
| POST | `/api/events` | Create event (admin) |
| PUT | `/api/events/{id}` | Update event (admin) |
| DELETE | `/api/events/{id}` | Delete event (admin) |
| GET | `/api/team` | List team members (sorted by order) |
| POST/PUT/DELETE | `/api/team/{id}` | CRUD (admin) |
| GET | `/api/articles` | List articles |
| GET | `/api/articles/{id}` | Get article |
| POST/PUT/DELETE | `/api/articles/{id}` | CRUD (admin) |
| GET | `/api/projects` | List projects |
| POST/PUT/DELETE | `/api/projects/{id}` | CRUD (admin) |
| GET | `/api/opportunities` | List opportunities |
| POST/PUT/DELETE | `/api/opportunities/{id}` | CRUD (admin) |
| POST | `/api/checkin/{code}` | Public check-in by QR code (no auth) |
| GET | `/api/checkin` | List all check-ins (admin) |
| GET | `/api/checkin/event/{id}` | Check-ins for one event (admin) |
| GET | `/api/checkin/leaderboard` | Attendance leaderboard (public) |

## What Works Now

- Landing page with hero, about, featured events, team preview, CTA
- Events page with category badges and date display
- Team page with member cards and social links
- Projects page with tech stack tags and GitHub links
- Blog with article list and detail pages
- Internship and opportunity board with deadline badges
- QR Code Check-in System - each event has a unique code, members scan the QR to check in with name and email, duplicate check-ins are blocked
- Leaderboard page showing top attendees ranked by event check-ins
- Admin dashboard with tabbed CRUD tables for all content types + check-in viewer
- JWT-based admin authentication
- Floating chat widget (UI shell, placeholder responses)
- Footer with social media links (Instagram, LinkedIn, GitHub, Discord)
- Responsive mobile-friendly design
- Google brand colors and clean Material-inspired UI
- All images using placehold.co placeholders
- SQLite database, no external DB setup needed
- Seed data so the site looks populated right away

## What Needs To Be Built (TODO)

These are features I recommend building next. They are great tasks for club members to learn from and ship real value.

### Known Issues / Incomplete

- **Chat Widget** - UI shell only, returns placeholder responses. Needs connection to the Python chatbot microservice.
- **CORS** - Backend currently allows `localhost:3000` and `localhost:3001`. Update `SecurityConfig.java` when deploying to a real domain.
- **Images** - All images use placehold.co placeholders. Replace with real photos and logos.
- **Admin Password** - Default is `admin123` with a hardcoded BCrypt seed. Change this before any real deployment.
- **JWT Secret** - Hardcoded in `application.properties`. Move to an environment variable for production.
- **No DELETE confirmation** - Admin dashboard deletes items immediately with no "are you sure?" dialog.

### Features To Build

1. **Gamification / Points System** - The leaderboard currently shows raw check-in counts. Add a points system (e.g. workshops = 2 pts, meetups = 1 pt) so different events are weighted differently. Add a `points` field to the `Event` entity and calculate totals on the leaderboard.

2. **Chat Widget Integration** - The floating chat widget UI is already there. Connect it to the Python chatbot microservice. Replace the placeholder response in `ChatWidget.tsx` with an actual API call to the chatbot team's endpoint.

3. **Google Calendar API** - Fetch real events from a Google Calendar instead of the database. You can use the Google Calendar API client library for Java and keep the database events as a fallback or manual override.

4. **CV ATS Checker** - Let students upload their CV and get a score against job descriptions. This could be a separate microservice that the frontend calls, or you can add a file upload endpoint to the Spring Boot backend.

5. **Certificate Verifier** - Students enter a certificate ID to verify they attended a workshop. You need a `Certificate` entity with a unique code linked to an event and member. This pairs well with the Certificate Generator project.

6. **Speaker Call for Papers (CFP)** - A permanent public form where people apply to speak at events. Add a `SpeakerApplication` entity and a public POST endpoint (no auth needed for submitting).

7. **Event Photo Gallery** - Upload and display photos from past hackathons and meetups. File upload to the backend with a `GalleryImage` entity. Consider using cloud storage (like Google Cloud Storage or AWS S3) for the images.

8. **Resource Library** - Upload and download workshop slides. Similar to the photo gallery but with PDF/PPTX files. Add a `Resource` entity with file path, event association, and download count.

9. **OAuth2 Google Login** - Replace the simple admin JWT with Google OAuth2. Spring Security has built-in OAuth2 client support. This lets any Google user log in, and you can restrict admin access by email domain or a role field.

10. **Docker Setup** - Dockerfile for backend (Java 21 + Maven build), Dockerfile for frontend (Node + Next.js build), and a docker-compose.yml that runs both. Good for deployment and sharing the dev environment.

11. **Project Showcase Submission** - Let students submit their own projects through a public form. Add a public POST endpoint that creates projects with a "pending" status, and admin can approve them in the dashboard.

## Design Notes

- Colors follow Google's brand palette: Blue `#4285F4`, Red `#EA4335`, Yellow `#FBBC05`, Green `#34A853`
- Dark text on white/light gray backgrounds for readability
- Rounded corners, subtle shadows, hover transitions
- All placeholder images are from placehold.co and can be replaced with real photos
- The `orderIndex` field on `TeamMember` controls the display order on the team page

## A Tip for Contributors

Start by running the project locally and poking around the admin dashboard. Create some events, add team members, write an article. That will give you a feel for how the data flows from the backend to the frontend. When you are ready to tackle a TODO item, pick one that excites you and open a PR. Keep it small and focused. If you get stuck, ask in the Discord. We are all learning here.
