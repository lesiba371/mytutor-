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

