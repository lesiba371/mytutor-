# MyTutor 📚

A cross-platform native phone app for tutoring, built with **React Native** (Expo).

## Features

| Screen | Description |
|---|---|
| **Home** | Subject categories, featured tutors, search shortcut |
| **Find Tutors** | Full tutor list with search & subject filter |
| **Tutor Profile** | Bio, education, rating, subject selector, available slots |
| **Book a Session** | Date, time, and duration picker with cost summary |
| **My Sessions** | Upcoming, completed, and cancelled sessions |
| **Profile** | User info, stats, notification preferences, account settings |

## Tech Stack

- [Expo](https://expo.dev/) (SDK 54) — cross-platform React Native toolchain
- [React Navigation v7](https://reactnavigation.org/) — bottom tabs + native stack
- TypeScript — full type safety throughout

## 🐳 Run Locally with Docker

The fastest way to run the app locally is via Docker. No Node.js installation needed.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/install/) v2

### Production build (nginx, port 3000)

Builds the Expo web bundle and serves it with nginx:

```bash
docker compose up web --build
```

Open **http://localhost:3000** in your browser.

> To run in the background: `docker compose up web --build -d`

### Development server (hot-reload, port 8081)

Mounts your local source files for live hot-reload:

```bash
docker compose --profile dev up dev --build
```

Open **http://localhost:8081** in your browser.

### Stop containers

```bash
docker compose down
```

### Docker files at a glance

| File | Purpose |
|---|---|
| `Dockerfile` | Multi-stage build → nginx production image |
| `Dockerfile.dev` | Development server with hot-reload |
| `docker-compose.yml` | Orchestrates `web` (prod) and `dev` services |
| `nginx.conf` | SPA routing, gzip, asset caching |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [Expo Go](https://expo.dev/client) app on your iOS or Android device, **or** an Android/iOS simulator

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on a specific platform
npm run android    # Android emulator / device
npm run ios        # iOS simulator (macOS only)
npm run web        # Web browser
```

Scan the QR code displayed in the terminal with **Expo Go** to open the app on your device.

## Project Structure

```
mytutor-/
├── App.tsx                   # Root component & navigation container
├── app.json                  # Expo configuration
├── Dockerfile                # Production multi-stage Docker image
├── Dockerfile.dev            # Development Docker image (hot-reload)
├── docker-compose.yml        # Docker Compose services
├── nginx.conf                # nginx SPA config for production container
├── src/
│   ├── data/                 # Sample data & TypeScript types
│   ├── navigation/           # Navigator setup & route types
│   ├── screens/              # One file per screen
│   │   ├── HomeScreen.tsx
│   │   ├── TutorsScreen.tsx
│   │   ├── TutorProfileScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   ├── SessionsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/           # Reusable UI components
│   │   ├── TutorCard.tsx
│   │   └── SessionCard.tsx
│   └── theme/                # Design tokens (colours, spacing, typography)
└── assets/                   # Icons & splash screen
```

## License

MIT — see [LICENSE](LICENSE).

