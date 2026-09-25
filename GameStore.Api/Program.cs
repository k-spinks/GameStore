using GameStore.Api.Data;
using GameStore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Adds validation to each endpoint of the API
builder.Services.AddValidation();

// Calls seeder function
builder.AddGameStoreDb();

var app = builder.Build();

// Serves default file (index.html) when a request hits the root
app.UseDefaultFiles();

// Serves the built React app's static files (JS, CSS, images) from wwwroot
app.UseStaticFiles();

// Listens for game endpoints
app.MapGamesEndpoints();

// Listens for genre endpoints
app.MapGenreEndpoints();

app.MigrateDb();

// Sends any unmatched route back to index.html so React Router can handle it client-side
app.MapFallbackToFile("index.html");

app.Run();