import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, TextField, Button, Container, Paper, Typography, Alert } from '@mui/material';
import useApiError from '../services/useApiError';
import ApiException from '../ApiException';
import AuthService from '../services/authService';

function SignUpPage() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [salary, setSalary] = useState(null);
  const navigate = useNavigate();
  const { error, handleApiError, clearError } = useApiError();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.signup( employeeName ,emailId, password , salary);
      console.log(response);
      if( response.status === 201 ) {
       
        navigate('/login');
      }
    
    } 
    catch (error) {
      if (error instanceof ApiException) {
        console.log(error);
        handleApiError(error.message, error.statusCode); // Use the custom error message from ApiException
      } else {
        console.log(error);
        handleApiError('An error occurred while signing up!');
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{
        padding: 3, width: '100%',
         display: 'flex',
         flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSignup}  style={{
          width:'100%',
         display: 'flex',
         flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
          <TextField
            fullWidth
            label="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email Id"
            type='email'
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>

        <Snackbar
          open={error !== null}
          autoHideDuration={6000} // Duration to display the Snackbar
          onClose={clearError}
          // message={error}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        // key={{ vertical: "bottom" ,horizontal: "center"}}
        >
          <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default SignUpPage;
