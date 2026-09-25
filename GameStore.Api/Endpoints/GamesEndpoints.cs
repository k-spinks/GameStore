namespace GameStore.Api.Endpoints;

using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

public static class GamesEndpoints
{
  const string GetGameEndpointName = "GetGame";

  public static void MapGamesEndpoints(this WebApplication app)
  {

    // All group.* methods start with '/games' route
    var group = app.MapGroup("/games");

    // GET: Return all games
    group.MapGet("/", async (GameStoreContext dbContext) => await dbContext.Games
    .Include(game => game.Genre)
    .Select(game => new GameSummaryDto(
      game.Id,
      game.Name,
      game.Genre!.Name,
      game.Price,
      game.ReleaseDate
    ))
    .AsNoTracking()
    .ToListAsync());

    // GET: Return a single game
    // WithName Method allows other functions to reference this route
    group.MapGet("/{id}", async (int id, GameStoreContext dbContext) =>
    {
      var game = await dbContext.Games.FindAsync(id);

      return game is null ? Results.NotFound() : Results.Ok(
        new GameDetailsDto(
          game.Id,
          game.Name,
          game.GenreId,
          game.Price,
          game.ReleaseDate
        )
      );
    })
      .WithName(GetGameEndpointName);

    // POST: Create a new game
    group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext) =>
    {
      Game game = new()
      {
        Name = newGame.Name,
        GenreId = newGame.GenreId,
        Price = newGame.Price,
        ReleaseDate = newGame.ReleaseDate
      };

      // Keeps track of items to add to db
      dbContext.Games.Add(game);

      // Adds list from above to db
      await dbContext.SaveChangesAsync();

      GameDetailsDto gameDto = new(
        game.Id,
        game.Name,
        game.GenreId,
        game.Price,
        game.ReleaseDate
      );

      // Returns create game with reference of route on where to find it
      return Results.CreatedAtRoute(GetGameEndpointName, new { id = gameDto.Id }, gameDto);
    });

    // PUT: Update game
    group.MapPut("/{id}", async (
      int id,
      UpdateGameDto updatedGame,
      GameStoreContext dbContext) =>
    {
      var existingGame = await dbContext.Games.FindAsync(id);

      if (existingGame is null)
      {
        return Results.NotFound();
      }

      existingGame.Name = updatedGame.Name;
      existingGame.GenreId = updatedGame.GenreId;
      existingGame.Price = updatedGame.Price;
      existingGame.ReleaseDate = updatedGame.ReleaseDate;

      await dbContext.SaveChangesAsync();

      return Results.NoContent();
    });

    // DELETE: Remove game
    group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) =>
    {
      await dbContext.Games.Where(game => game.Id == id).ExecuteDeleteAsync();

      return Results.NoContent();
    });
  }
}
