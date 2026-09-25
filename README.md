# Game Store

A full-stack game catalog application built with ASP.NET Core 10 and React + TypeScript.

## Overview

GameStore is a web application that allows users to manage a catalog of video games. The project consists of:

- **Backend API**: ASP.NET Core 10 REST API with Entity Framework Core
- **Frontend**: React 19 with TypeScript, React Router, and MUI (v9)
- **Database**: SQLite
- **Deployment**: Containerized with Docker; deployed to [Render](https://render.com)'s free tier

## Prerequisites

Before you begin, ensure you have the following installed:

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (only needed if you want to build/run the containerized version)

## Getting Started (Local Development)

Running the API and frontend as two separate dev servers is the fastest workflow for day-to-day development — hot reload works on both sides.

### 1. Backend Setup (API)

Open a terminal in the GameStore root directory, navigate to the API folder, and run the application:

```bash
cd GameStore.Api
dotnet run
```

This will automatically restore dependencies, apply database migrations, and start the API. The API will start at:
`http://localhost:5001`

You can test the API endpoints using the included `games.http` file (requires REST Client extension in VS Code).

### 2. Frontend Setup (React)

Open a new terminal in the GameStore root directory and navigate to the React folder:

```bash
cd GameStore.React
npm install
```

#### Run the Frontend

```bash
npm run dev
```

The React application will start at `http://localhost:5173` (or another port if 5173 is busy). In dev mode, Vite proxies API requests to the backend (see `vite.config.ts`), so both servers need to be running.

## Running with Docker

The app also builds into a single self-contained image: a multi-stage build compiles the React frontend, publishes the ASP.NET Core API, and copies the built frontend into the API's `wwwroot` so one process serves everything on one port.

From the repo root:

```bash
docker build -t gamestore .
docker run -p 8080:8080 gamestore
```

Then open `http://localhost:8080` — no separate frontend server needed.

## Deployment

The Docker image is deployed to [Render](https://render.com) as a free-tier web service, built directly from this repo's `Dockerfile`.

**Note on data persistence:** Render's free tier does not provide a persistent disk. The SQLite database resets to its seeded state on every redeploy (it survives normal idle spin-down/wake-up, just not a rebuild). This is expected and acceptable for a demo project — it would need a hosted database (e.g. managed Postgres) to persist data across deploys in a real production setting.

## Project Structure

### Backend (GameStore.Api)

```
GameStore.Api/
├── Data/                  # Database context and migrations
├── Dtos/                  # Data Transfer Objects
├── Endpoints/             # Minimal API endpoints
├── Models/                # Entity models (Game, Genre)
├── appsettings.json       # Configuration
└── Program.cs             # Application entry point
```

### Frontend (GameStore.React)

```
GameStore.React/
├── src/
│   ├── clients/           # API client services
│   ├── components/        # React components
│   ├── models/            # TypeScript interfaces
│   ├── pages/             # Page components
│   ├── theme/             # MUI theme configuration
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Application entry point
└── public/                # Static assets
```

### Root

```
GameStore/
├── GameStore.Api/
├── GameStore.React/
├── Dockerfile              # Multi-stage build: React -> .NET publish -> final image
└── README.md
```

## API Endpoints

### Games

- `GET /games` - Get all games
- `GET /games/{id}` - Get a specific game
- `POST /games` - Create a new game
- `PUT /games/{id}` - Update a game
- `DELETE /games/{id}` - Delete a game

### Genres

- `GET /genres` - Get all genres

## Technologies Used

### Backend

- ASP.NET Core 10
- Entity Framework Core
- SQLite
- Minimal APIs

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- MUI (v9)
- notistack (toast notifications)

### Infrastructure

- Docker (multi-stage builds)
- Render (hosting)

## Development Tips

1. **Hot Reload**: Both the API and React app support hot reload during local development
2. **Database**: The SQLite database file (`GameStore.db`) will be created in the API project directory
3. **API Testing**: Use the `games.http` file for quick API testing in VS Code with the REST Client extension
4. **Docker builds are cached in layers**: rebuilding after only a frontend or backend source change should be quick, since `npm ci`/`dotnet restore` layers only re-run when their respective dependency files change

## Troubleshooting

### Port Conflicts

If the default ports are already in use:

- **API**: Modify `applicationUrl` in `Properties/launchSettings.json`
- **Frontend**: Vite will automatically suggest an alternative port

### Database Issues

If you encounter database errors:

```bash
cd GameStore.Api
dotnet ef database drop
dotnet ef database update
```

### Frontend Not Connecting to API (Local Dev)

Ensure:

1. The API is running on the expected port
2. Check the proxy configuration in `GameStore.React/vite.config.ts` matches the API's port

### Docker Build Fails on `npm run build` with TypeScript Errors

`npm run dev` skips type-checking, but the Docker build runs a full `tsc` type-check as part of `npm run build`. If a component compiles fine in dev but fails in the Docker build, run `npm run build` locally first to catch and fix type errors before rebuilding the image.
