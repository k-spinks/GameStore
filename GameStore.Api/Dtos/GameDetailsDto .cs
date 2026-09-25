namespace GameStore.Api.Dtos;

/*
A DTO is a contract between the client and server since it represents a shared agreement about how data will be transferred and used.
*/

public record GameDetailsDto(
  int Id,
  string Name,
  int GenreID,
  decimal Price,
  DateOnly ReleaseDate
);
