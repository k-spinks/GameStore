# Game Store API

ASP.NET Core 10 REST API for managing a video game catalog, using Entity Framework Core and SQLite.

## Features

- CRUD endpoints for games (name, genre, price, release date)
- Genre lookup endpoint
- Request validation on all endpoints
- Automatic database migration and seeding on startup

## Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download)

## Setup

1. Restore dependencies and run the API:

   ```bash
   dotnet run
   ```

   This automatically restores NuGet packages, applies any pending EF Core migrations, seeds the database if empty, and starts the API.

2. The API will be available at `http://localhost:5001`.

3. Test endpoints using the included `games.http` file (requires the REST Client extension in VS Code), or any HTTP client of your choice.

## Database

- **Provider**: SQLite
- The database file (`GameStore.db`) is created automatically in this project's directory on first run.
- Migrations live in `Data/` and are applied automatically at startup via `app.MigrateDb()` in `Program.cs`.

If you run into database errors during development, reset it with:

```bash
dotnet ef database drop
dotnet ef database update
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

## Project Structure

```
GameStore.Api/
├── Data/                  # Database context, seeding, and migrations
├── Dtos/                  # Data Transfer Objects
├── Endpoints/             # Minimal API endpoint definitions
├── Models/                # Entity models (Game, Genre)
├── appsettings.json       # Configuration
└── Program.cs             # Application entry point
```

## Technology Stack

- ASP.NET Core 10
- Entity Framework Core
- SQLite
- Minimal APIs

## Production / Docker

This API is not built into its own standalone Docker image. It's compiled together with the built React frontend into a single container, which serves both the API routes and the frontend's static files from one process. See the `Dockerfile` and README at the repository root for the full containerized build and deployment steps.

## Notes

- CORS is not configured — the API is designed to be served from the same origin as its frontend (see the root README for how the two are combined in production). If you run this API standalone against a frontend on a different origin, you'll need to add a CORS policy.
