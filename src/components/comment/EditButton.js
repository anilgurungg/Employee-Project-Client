import React, { useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

function EditButton({onClick}) {

  return (
       <IconButton aria-label="edit" color='primary' onClick={onClick} >
          <Edit />
        </IconButton>
      );
}

export default EditButton;
