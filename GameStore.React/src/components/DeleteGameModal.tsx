import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { type GameSummary } from '../models/GameSummary';

interface DeleteGameModalProps {
  game: GameSummary;
  open: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onDelete: (gameId: string) => void;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({
  game,
  open,
  isDeleting,
  onCancel,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={() => !isDeleting && onCancel()}>
      <DialogTitle>Delete Game</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{game.name}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          disabled={isDeleting}
          onClick={() => onDelete(game.id)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteGameModal;
