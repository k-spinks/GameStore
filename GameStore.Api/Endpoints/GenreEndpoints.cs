using GameStore.Api.Data;
using GameStore.Api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class GenreEndpoints
{
  public static void MapGenreEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("/genres");

    //GET: Gets all genres
    group.MapGet("/", async (GameStoreContext dbContext) => await dbContext.Genre
    .Select(genre => new GenreDto(genre.Id, genre.Name))
    .AsNoTracking()
    .ToListAsync());
  }
}
