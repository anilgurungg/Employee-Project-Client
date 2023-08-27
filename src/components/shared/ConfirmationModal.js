import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Button } from '@mui/material';

const ConfirmationModal = ({ open, setOpen, handleDelete, isDeleting , name, onConfirm}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;
