# Jobify

An Angular job board application that lets users search for jobs, save favorites, and track their applications — all in one place.

## Features

- **Job Search** — Browse job listings from an external API with pagination and search bar
- **Favorites** — Save jobs to your favorites list for quick access later
- **Application Tracking** — Track jobs you've applied to with status management (pending, accepted, rejected, interview) and personal notes
- **Authentication** — Register and log in to access personalized features
- **Profile** — View and manage your user profile

## Tech Stack

- **Angular 19** (standalone components, lazy-loaded routes)
- **NgRx** (Store, Effects, DevTools) for state management
- **Tailwind CSS 4** for styling
- **JSON Server** as a mock REST API backend
- **RxJS** for reactive programming

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd jobify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment files

```bash
npm run setup:env
```

This copies the example environment and database files:

- `src/environments/environment.example.ts` → `environment.ts`
- `src/environments/environment.prod.example.ts` → `environment.prod.ts`
- `src/assets/data/db-exemple.json` → `db.json`

Then fill in your environment values:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  baseApiUrl: 'http://127.0.0.1:3000',
  jobApiUrl: 'https://www.arbeitnow.com/api/job-board-api'
};
```

### 4. Start JSON Server

```bash
npm run start:json-server
```

Runs on `http://127.0.0.1:3000` by default.

### 5. Start the Angular app

```bash
npm start
```

Navigate to `http://localhost:4200/`.

## Project Structure

```
src/app/
├── core/
│   ├── guards/          # Auth & guest route guards
│   ├── interceptors/
│   └── services/        # HTTP services (user, job, favorite, track-application)
├── features/
│   ├── auth/            # Login & register pages
│   ├── favorite/        # Favorites page
│   ├── profile/         # User profile page
│   ├── search/jobs/     # Job search & listing page
│   └── track-application/  # Application tracker page
├── shared/
│   ├── components/      # Reusable components (navbar, job-card, pagination, search-bar, auth-master)
│   └── models/          # TypeScript interfaces
└── store/
    ├── user/            # User state (auth)
    ├── job/             # Job listings state
    ├── favorite/        # Favorites state
    └── track-application/  # Tracked applications state
```

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start dev server on port 4200 |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run start:json-server` | Start JSON Server on port 3000 |
| `npm run setup:env` | Copy example env & db files |
