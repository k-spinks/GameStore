using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

using GameStore.Api.Models;
public static class DataExtensions
{
  public static void MigrateDb(this WebApplication app)
  {
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<GameStoreContext>();
    dbContext.Database.Migrate();
  }

  public static void AddGameStoreDb(this WebApplicationBuilder builder)
  {
    // Creates db connection with dependency injection and reading conn str from configs
    var connString = builder.Configuration.GetConnectionString("GameStore");

    /* DbContext has a Scoped service lifetime because:
       1. It ensures that a new instance of DbContext is created per request
       2. DB connections are a limited and expensive resource
       3. DbContext is not thread-safe. Scoped avoids to concurrency issues
       4. Makes it easier to manage transactions and ensure data consistency
       5. Reusing a DbContext instance can lead to increased memory usage
    */


    // Seeds database genre table
    builder.Services.AddSqlite<GameStoreContext>(
      connString,
      optionsAction: options => options.UseSeeding((context, _) =>
      {
        if (!context.Set<Genre>().Any())
        {
          context.Set<Genre>().AddRange(
            new Genre { Name = "Survival" },
            new Genre { Name = "RPG" },
            new Genre { Name = "Fighting" },
            new Genre { Name = "Open World" },
            new Genre { Name = "Shooter" },
            new Genre { Name = "Sports" },
            new Genre { Name = "Racing" }
          );

          context.SaveChanges();
        }
      })
    );
  }
}
