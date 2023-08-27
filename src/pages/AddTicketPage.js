// Example usage in a component
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Box } from '@mui/material';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import ProjectService from '../services/projectService';
import TicketService from '../services/ticketService';
import AuthService from '../services/authService'; // Import the AuthService
import useApiError from '../services/useApiError'; 
import ApiException from '../ApiException';
import { red } from '@mui/material/colors';
function AddTicketPage() {
    const navigate = useNavigate(); 
    const { projectId } = useParams();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const { error, handleApiError, clearError } = useApiError(); 

  const handleAddTicket = async () => {
    const token = AuthService.getToken(); // Get the JWT token using AuthService
    const ticketData = { subject, description };

    try {
        const addedProject = await TicketService.addTicket(token, projectId, ticketData);
        if (addedProject) {
          console.log('Project added successfully:', addedProject);
          navigate(`/projects/${projectId}`);
          // You can add additional logic or redirection here
        }
      } catch (error) {
        if (error instanceof ApiException) {
            handleApiError(error.message); // Use the custom error message from ApiException
          } else {
            handleApiError('An error occurred while adding the project.');
          }
      }
  };

  return (
    <Container maxWidth="md">
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        // minHeight="100vh" // Center content vertically
        p={4}
      >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Add New Ticket
        </Typography>
      <TextField
        label="Name"
        fullWidth
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <Box mt={4}>
      <Button variant="contained" color="primary" onClick={handleAddTicket}>
        Add Ticket
      </Button>
      </Box>
      <Snackbar
        open={error !== null}
        autoHideDuration={6000} // Duration to display the Snackbar
        onClose={clearError}
        message={error}
      />
      </Box>
    </Container>
  );
}

export default AddTicketPage;
