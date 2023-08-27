// Example usage in a component
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Box } from '@mui/material';
import { Link, useNavigate, useLocation , useParams} from 'react-router-dom';
import ProjectService from '../services/projectService';
import AuthService from '../services/authService'; // Import the AuthService
import useApiError from '../services/useApiError'; 
import ApiException from '../ApiException';

function EditProjectPage() {
    const navigate = useNavigate(); 
    const { projectId } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { error, handleApiError, clearError } = useApiError(); 

  const handleEditProject = async () => {
    const token = AuthService.getToken(); // Get the JWT token using AuthService
    const projectData = { name, description };

    try {
        const editedProject = await ProjectService.editProject(token, projectId, projectData);
        if (editedProject) {
          console.log('Project edited successfully:', editedProject);
          navigate(`/projects/${projectId}`);
          // You can add additional logic or redirection here
        }
      } catch (error) {
        if (error instanceof ApiException) {
            handleApiError(error.message); // Use the custom error message from ApiException
          } else {
            handleApiError('An error occurred while editing the project.');
          }
      }
  };

  const fetchProjectDetails = async() => {
    const token = AuthService.getToken();
    try {
    const projectDetails = await ProjectService.getProjectById(token, projectId);
    setName(projectDetails.name);
    setDescription(projectDetails.description);
    console.log(projectDetails);
    }catch(error) {
      if (error instanceof ApiException) {
        handleApiError(error.message); // Use the custom error message from ApiException
      } else {
        handleApiError('An error occurred while adding the project.');
      }
    }
  }

  useEffect(() => {
    fetchProjectDetails();
  
    
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
        Edit Project
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
      <Button variant="contained" color="primary" onClick={handleEditProject}>
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

export default EditProjectPage;
