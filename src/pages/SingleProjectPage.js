// src/pages/SingleProjectPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Grid, Paper, Stack, Box, Tooltip } from '@mui/material';
import { Delete, PlusOne, Add, ManageAccounts, Edit } from '@mui/icons-material';
import ProjectService from '../services/projectService';
import AuthService from '../services/authService';
import useApiError from '../services/useApiError';
import ApiException from '../ApiException';
import TicketList from '../components/TicketList';
import EntityAssignmentModal from '../components/EntityAssignmentModal';
import TimestampToDate from '../utils/TimeStampToDate';
import EmployeeService from '../services/employeeService';

function SingleProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [employeeDetailsMap, setEmployeeDetailsMap] = useState({});

  const { handleApiError, error, clearError } = useApiError();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const token = AuthService.getToken(); // Get the JWT token using AuthService
        const projectData = await ProjectService.getProjectById(token, projectId);
        setProject(projectData);

        const employeeIdsSet = new Set([...projectData.assignedEmployeeIds, projectData.createdBy, projectData.updatedBy]);
        const employeeIds = Array.from(employeeIdsSet).filter(id => id !== null && id !== undefined);
        const newEmployeeDetailsMap = {};

        await Promise.all(
          employeeIds.map(async (employeeId) => {
            const employeeData = await EmployeeService.getEmployeeById(token, employeeId);
            console.log(employeeData);
            newEmployeeDetailsMap[employeeId] = employeeData.employeeName;
          })
        );
        setEmployeeDetailsMap(newEmployeeDetailsMap);
      } catch (error) {
        if (error instanceof ApiException && error.status === 401) {
          handleApiError(error.message);
        } else if (error instanceof ApiException && error.status === 404) {
          handleApiError(error.message);
          // Handle 404 error (Project Not Found)
        } else {
          handleApiError('An error occurred while fetching the project.');
        }
      }
    }

    fetchProject();
  }, [projectId, handleApiError]);



  const handleDelete = async () => {
    setIsDeleting(true);

    // Close the confirmation dialog
    setOpenConfirmation(false);
    try {
      const token = AuthService.getToken();
      await ProjectService.deleteProject(token, projectId);
      navigate("/projects");
      // Optionally, you can redirect to another page after successful deletion
    } catch (error) {
      if (error instanceof ApiException) {
        console.log(error);
        handleApiError(error.message);
      } else {
        handleApiError('An error occurred while deleting the project.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  if (error) {
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography color="error">{error}</Typography>
        {/* <button onClick={clearError}>Clear Error</button> */}
        <Link to="/projects">
          <Button variant="outlined" color="secondary">
            Back to Projects
          </Button>
        </Link>
      </Container>

    );
  }

  if (!project) {
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Grid container spacing={0} sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }} >
      <Stack item xs={12} >

        <Typography variant="h4" component="h1" gutterBottom align='center'>
          Project Details
        </Typography>

      </Stack>
      <Stack direction={'row'} sx={{ flex: 1,  display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Paper sx={{ width: '400px', height: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', paddingY:'20px'}}>
          <Box sx={{width:'90%', padding:0, marginBottom:'auto', display: 'flex', justifyContent: 'flex-start',flexDirection: 'column'}}>
          <Typography variant="h5" component="h2" gutterBottom>
          <b>{project.projectId}</b>  {project.name}
            </Typography>

            <Typography variant='caption' textAlign='left'  gutterBottom>
              Created by  {employeeDetailsMap[project.createdBy]} {<TimestampToDate timestamp={project.createdAt} />}.
            </Typography>
            {
              project.updatedBy !== null && project.updatedBy !== undefined &&
              <Typography variant='caption' textAlign='left' >
                Updated by  {employeeDetailsMap[project.updatedBy]} {<TimestampToDate timestamp={project.updatedAt} />}.
              </Typography>
            }
            <Typography variant='body1' marginTop={'10px'} >{project.description}</Typography>
          </Box>


          <Box container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width:'90%' }} >
            <Box  >
              <Tooltip title="Delete">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenConfirmation(true)}
                  disabled={isDeleting}
                  size='small'
                  startIcon={<Delete />}
                >
                  {/* Delete  */}
                </Button>
              </Tooltip>
            </Box>
            <Box  >
              <Tooltip title="Add Ticket">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate(`/projects/${projectId}/tickets/add`)}
                  size='small'
                  disabled={isDeleting}
                  startIcon={<Add />}
                >
                  {/* Add Ticket */}
                </Button>
              </Tooltip>
            </Box>
            

            {/* Confirmation Dialog */}
            <Dialog
              open={openConfirmation}
              onClose={() => setOpenConfirmation(false)}
            >
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this project?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenConfirmation(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary" disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </DialogActions>
            </Dialog>
            <Box  >
              <Tooltip title="Edit Project">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/projects/${projectId}/edit`)}
                  size='small'
                  startIcon={<Edit />}
                >
                </Button>
              </Tooltip>
            </Box>
            <Box item xs={4} >
            <Tooltip title="Manage Employees">
              <Button variant="contained" color="info" onClick={handleOpenModal} size='small' startIcon={ <ManageAccounts /> } >
              </Button>
              </Tooltip>
            </Box>
          </Box>
        </Paper>



        <EntityAssignmentModal
          open={openModal}
          onClose={handleCloseModal}
          entityType='project'
          entityId={projectId} // Pass the projectId as entityId
          entity={project}     // Pass the project as entity
          fetchEntityFn={ProjectService.getProjectById} // Update with correct fetch function
          assignEntityFn={ProjectService.addEmployee}   // Update with correct assign function
          removeEntityFn={ProjectService.removeEmployee} // Update with correct remove function
        />
        <Box item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'auto', width: '400px', height: '400px' }}>
          <TicketList projectId={projectId} />
        </Box>
      </Stack>
    </Grid>
  );
}

export default SingleProjectPage;
