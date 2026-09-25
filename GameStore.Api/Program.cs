using GameStore.Api.Data;
using GameStore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Adds validation to each endpoint of the API
builder.Services.AddValidation();

// Calls seeder function
builder.AddGameStoreDb();

var app = builder.Build();

// Listens for game endpoints
app.MapGamesEndpoints();

// Listens for genre endpoints
app.MapGenreEndpoints();

app.MigrateDb();

app.Run();
