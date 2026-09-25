import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GamesClient from '../clients/GamesClient';
import { type GameSummary } from '../models/GameSummary';
import DeleteGameModal from '../components/DeleteGameModal';

const Home: React.FC = () => {
  const [games, setGames] = useState<GameSummary[]>([]);
  const [loadingErrorList, setLoadingErrorList] = useState<string[]>([]);
  const [errorList, setErrorList] = useState<string[]>([]);
  const [gameToDelete, setGameToDelete] = useState<GameSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const client = new GamesClient();

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const response = await client.getGamesAsync();
      setGames(response);
      setLoadingErrorList([]);
    } catch (error: unknown) {
      setLoadingErrorList([
        error instanceof Error ? error.message : 'An unknown error occurred',
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Game Store';
    fetchGames();
  }, []);

  const handleDelete = async (gameId: string) => {
    setErrorList([]);
    setIsDeleting(true);
    try {
      const result = await client.deleteGameAsync(gameId);

      if (result.succeeded) {
        setGameToDelete(null);
        fetchGames();
      } else {
        setErrorList(result.errors);
      }
    } catch (error: unknown) {
      setErrorList([
        error instanceof Error ? error.message : 'An unknown error occurred',
      ]);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
        <CircularProgress size={20} />
        <Typography variant="body1">Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component={RouterLink} to="/editgame">
          New Game
        </Button>
      </Box>

      {loadingErrorList.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {loadingErrorList.map((error, index) => (
            <Alert severity="error" key={index} sx={{ mb: 1 }}>
              Error loading games: {error}
            </Alert>
          ))}
        </Box>
      )}

      {errorList.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {errorList.map((error, index) => (
            <Alert severity="error" key={index} sx={{ mb: 1 }}>
              {error}
            </Alert>
          ))}
        </Box>
      )}

      {loadingErrorList.length === 0 && games.length === 0 ? (
        <Typography sx={{ mt: 2 }} fontStyle="italic">
          No games found. Click "New Game" to add your first game!
        </Typography>
      ) : (
        loadingErrorList.length === 0 && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell>Release Date</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game.id} hover>
                    <TableCell>{game.name}</TableCell>
                    <TableCell>{game.genre}</TableCell>
                    <TableCell align="right">${game.price}</TableCell>
                    <TableCell>{game.releaseDate}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/editgame/${game.id}`}
                        color="primary"
                        aria-label="edit game"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete game"
                        onClick={() => setGameToDelete(game)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}

      {gameToDelete && (
        <DeleteGameModal
          game={gameToDelete}
          open={gameToDelete !== null}
          isDeleting={isDeleting}
          onCancel={() => setGameToDelete(null)}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default Home;
