// Example usage in a component
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Box } from '@mui/material';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import ProjectService from '../services/projectService';
import TicketService from '../services/ticketService';
import AuthService from '../services/authService'; // Import the AuthService
import useApiError from '../services/useApiError'; 
import ApiException from '../ApiException';
import { red } from '@mui/material/colors';
function EditTicketPage() {
    const navigate = useNavigate(); 
    const { projectId, ticketId } = useParams();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const { error, handleApiError, clearError } = useApiError(); 

  const handleEditTicket = async () => {
    const token = AuthService.getToken(); // Get the JWT token using AuthService
    const ticketData = { subject, description };

    try {
        const editedTicket = await TicketService.editTicket(token, projectId, ticketId, ticketData);
        if (editedTicket) {
          console.log('Ticket edited successfully:', editedTicket);
          navigate(`/projects/${projectId}/tickets/${ticketId}`);
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

  const fetchTicketDetails = async() => {
    const token = AuthService.getToken();
    try {
    const ticketDetails = await TicketService.getTicketById(token, projectId,ticketId);
    setSubject(ticketDetails.subject);
    setDescription(ticketDetails.description);
    console.log(ticketDetails);
    }catch(error) {
      if (error instanceof ApiException) {
        handleApiError(error.message); // Use the custom error message from ApiException
      } else {
        handleApiError('An error occurred while fetching the ticket.');
      }
    }
  }

  useEffect(() => {
    fetchTicketDetails();
  
    
  }, [])

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
        Edit Ticket ID {ticketId}
        </Typography>
      <TextField
        label="Subject"
        fullWidth
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        margin="normal"
        multiline
        rows={2}
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <Box mt={4}>
      <Button variant="contained" color="primary" onClick={handleEditTicket}>
        Save Changes
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

export default EditTicketPage;
