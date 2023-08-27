import React, { useState , useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Snackbar, TextField, Button, Container, Paper, Typography, Stack, Alert } from '@mui/material';
import { useUserContext } from '../context/UserContext';

function LoginPage() {
  const { login, errors, setErrors } = useUserContext();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      await login(emailId, password);
      navigate('/dashboard');
  };

  useEffect(() => {

    if (errors !== null) {
      // Automatically close the Snackbar after a certain duration
      const snackbarTimer = setTimeout(() => {
        setErrors(null);
      }, 6000);

      // Cleanup the timer when the component unmounts or when errors change
      return () => clearTimeout(snackbarTimer);
    }
  }, [errors]);

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
        <Typography variant='h4' >
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TextField
            fullWidth
            label="Email Id"
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
          <Stack direction={'row'} justifyContent={'space-evenly'} width={'100%'} alignItems={"center"} marginTop={'10px'}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Stack>

        </form>
        <Snackbar
          open={errors !== null}
          autoHideDuration={6000} // Duration to display the Snackbar
          onClose={() =>setErrors(null)}
          // message={error}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        // key={{ vertical: "bottom" ,horizontal: "center"}}
        >
          <Alert onClose={ () => setErrors(null)} severity="error" sx={{ width: '100%' }}>
            {errors}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default LoginPage;
