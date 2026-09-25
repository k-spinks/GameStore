import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  Stack,
  CircularProgress,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import GamesClient from '../clients/GamesClient';
import GenresClient from '../clients/GenresClient';
import { type GameDetails } from '../models/GameDetails';
import { type Genre } from '../models/Genre';

const EditGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameDetails | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [title, setTitle] = useState<string>('');
  const [loadingErrorList, setLoadingErrorList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const genresClient = new GenresClient();
  const { enqueueSnackbar } = useSnackbar();
  const defaultImageUri = 'https://placehold.co/100';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesClient = new GamesClient();

        if (id) {
          const gameData = await gamesClient.getGameAsync(id);
          setGame(gameData);
          setTitle(`Edit ${gameData.name}`);
        } else {
          setGame({
            id: '',
            name: '',
            genreId: null,
            price: 0,
            releaseDate: new Date().toISOString().split('T')[0],
            description: '',
            imageUri: defaultImageUri,
          });
          setTitle('New Game');
        }

        const genresData = await genresClient.getGenresAsync();
        setGenres(genresData);
      } catch (error: unknown) {
        setLoadingErrorList([
          error instanceof Error ? error.message : 'An unknown error occurred',
        ]);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!game) return;

    setIsSubmitting(true);

    try {
      const gamesClient = new GamesClient();

      const result = !id
        ? await gamesClient.addGameAsync(game)
        : await gamesClient.updateGameAsync({ ...game, id });

      if (result.succeeded) {
        enqueueSnackbar(!id ? 'Game added' : 'Game updated', {
          variant: 'success',
        });
        navigate('/');
      } else {
        result.errors.forEach((error) =>
          enqueueSnackbar(error, { variant: 'error' }),
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGame((prevGame) => ({
      ...prevGame!,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleGenreChange = (event: SelectChangeEvent) => {
    setGame((prevGame) => ({
      ...prevGame!,
      genreId: event.target.value,
    }));
  };

  if (loadingErrorList.length > 0) {
    return (
      <Box>
        {loadingErrorList.map((error, index) => (
          <Alert severity="error" key={index} sx={{ mb: 1 }}>
            {error}
          </Alert>
        ))}
      </Box>
    );
  }

  if (!genres || !game) {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <CircularProgress size={20} />
        <Typography variant="body1">Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h3" gutterBottom>
        {title}
      </Typography>

      <Box sx={{ maxWidth: 400, mt: 2 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Stack spacing={2}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={game.name}
              onChange={handleInputChange}
              required
              fullWidth
            />

            <TextField
              id="genre"
              name="genreId"
              label="Genre"
              select
              value={game.genreId ?? ''}
              onChange={handleGenreChange}
              required
              fullWidth
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={game.price}
              onChange={handleInputChange}
              required
              fullWidth
              slotProps={{
                htmlInput: { min: 1, max: 100, step: 0.01 },
              }}
            />

            <TextField
              id="releaseDate"
              name="releaseDate"
              label="Release Date"
              type="date"
              value={game.releaseDate}
              onChange={handleInputChange}
              required
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Save
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="inherit"
                disabled={isSubmitting}
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default EditGame;
