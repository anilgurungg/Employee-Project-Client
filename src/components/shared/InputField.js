import React from 'react';
import { TextField } from '@mui/material';

function InputField({ label, type, value, onChange, required }) {
  return (
     <TextField
     fullWidth
     label={label}
     value={value}
     onChange={onChange}
     margin="normal"
     type ={type}
     required={required}
   />
  );
}

export default InputField;
