# Game Store React Frontend

A React application for managing a game catalog with full CRUD operations, built with MUI.

## Features

- View games in a table
- Add new games
- Edit existing games
- Delete games (with confirmation)
- Toast notifications for all create/update/delete actions

## Prerequisites

- Node.js (v18+ recommended)
- Game Store API running on http://localhost:5001

## Setup

1. Install dependencies:

```bash
   npm install
```

2. Start the development server:

```bash
   npm run dev
```

3. Open http://localhost:5173 in your browser

In dev mode, API requests are proxied to the backend — see `vite.config.ts` for the proxy configuration.

## Production / Docker

This frontend is not built into its own standalone Docker image. It's compiled and served together with the API from a single container — see the `Dockerfile` and README at the repository root for the full containerized build and deployment steps.

## Technology Stack

- React 19
- TypeScript
- MUI (v9)
- Vite
- React Router
- notistack (toast notifications)
