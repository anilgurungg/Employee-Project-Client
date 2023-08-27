// Example usage in a component
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProjectService from '../services/projectService';
import AuthService from '../services/authService'; // Import the AuthService
import useApiError from '../services/useApiError'; 
import ApiException from '../ApiException';

function AddProjectPage() {
    const navigate = useNavigate(); 

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { error, handleApiError, clearError } = useApiError(); 

  const handleAddProject = async () => {
    const token = AuthService.getToken(); // Get the JWT token using AuthService
    const projectData = { name, description };

    try {
        const addedProject = await ProjectService.addProject(token, projectData);
        if (addedProject) {
          console.log('Project added successfully:', addedProject);
          navigate('/projects');
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
        Add New Project
      </Typography>
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        multiline 
        rows={2}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline 
        rows={4}
        margin="normal"
      />
       <Box mt={2}>
      <Button variant="contained" color="primary" onClick={handleAddProject}>
        Add Project
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

export default AddProjectPage;
