import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

function DeleteButton({onClick}) {
  return <IconButton onClick={onClick} aria-label="delete" color='error'>
  <Delete />
</IconButton>;
}

export default DeleteButton;
