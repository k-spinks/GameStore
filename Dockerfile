# ---- Stage 1: build the React app ----
FROM node:24-alpine AS react-build
WORKDIR /app
COPY GameStore.React/package*.json ./
RUN npm ci
COPY GameStore.React/ ./
RUN npm run build

# ---- Stage 2: build the ASP.NET Core app ----
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS api-build
WORKDIR /src
COPY GameStore.Api/*.csproj ./GameStore.Api/
RUN dotnet restore ./GameStore.Api/*.csproj
COPY GameStore.Api/ ./GameStore.Api/
RUN dotnet publish ./GameStore.Api -c Release -o /app/publish

# ---- Stage 3: assemble the final runtime image ----
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=api-build /app/publish .
COPY --from=react-build /app/dist ./wwwroot

EXPOSE 8080
ENTRYPOINT ["dotnet", "GameStore.Api.dll"]