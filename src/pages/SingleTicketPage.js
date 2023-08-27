// src/pages/SingleProjectPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Grid, Stack, Box, Paper, Tooltip } from '@mui/material';
import ProjectService from '../services/projectService';
import AuthService from '../services/authService';
import useApiError from '../services/useApiError';
import ApiException from '../ApiException';
import EntityAssignmentModal from '../components/EntityAssignmentModal';
import TicketService from '../services/ticketService';
import { CommentProvider } from '../context/CommentContext';
import CommentList from '../components/comment/CommentList';
import { Delete, Edit, ManageAccounts } from '@mui/icons-material';
import TimestampToDate from '../utils/TimeStampToDate';

function SingleTicketPage() {
  const { projectId, ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const { handleApiError, error, clearError } = useApiError();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const token = AuthService.getToken();

  useEffect(() => {
    async function fetchTicket() {
      try {
        const token = AuthService.getToken(); // Get the JWT token using AuthService
        const ticketData = await TicketService.getTicketById(token, projectId, ticketId);
        setTicket(ticketData);
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

    fetchTicket();
  }, [projectId, ticketId, handleApiError]);

  const handleDelete = async () => {
    setIsDeleting(true);

    // Close the confirmation dialog
    setOpenConfirmation(false);
    try {
      const token = AuthService.getToken();
      await TicketService.deleteTicket(token, projectId, ticketId);
      navigate(`/projects/${projectId}`);
      // Optionally, you can redirect to another page after successful deletion
    } catch (error) {
      if (error instanceof ApiException) {
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
        <button onClick={clearError}>Clear Error</button>
        <Link to="/projects">
          <Button variant="outlined" color="secondary">
            Back to Projects
          </Button>
        </Link>
      </Container>

    );
  }

  if (!ticket) {
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>

      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Ticket Details
      </Typography>
      <Stack spacing={2} direction="row">
        <Paper sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:'400px' ,padding:'15px', width:'370px' }}>
            <Stack>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                {ticket.subject}
              </Typography>
              </Box>
             
              <Box sx={{ width: "100%" }}>
              <Typography variant='caption' gutterBottom> Created {<TimestampToDate timestamp={ticket.createdAt} />}</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
              <Typography variant='body2' marginTop={'10px'}>{ticket.description}</Typography>
              </Box>
              </Stack>
         
          <Stack spacing={2} direction="row" sx={{justifyContent:'space-between'}} width={'100%'}>
          <Tooltip title="Delete Ticket" >
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenConfirmation(true)}
              disabled={isDeleting}
              size='small'
              startIcon={<Delete />}
            >
            </Button>
            </Tooltip>
            <Tooltip title="Edit Ticket" >
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate(`/projects/${projectId}/tickets/${ticketId}/edit`)}
              disabled={isDeleting}
              size='small'
              startIcon={<Edit />}
            >
            </Button>
            </Tooltip>

            <Tooltip title="Manage Asignees" >
            <Button variant="contained" color="secondary" onClick={handleOpenModal} size='small' startIcon={ <ManageAccounts /> }>
            </Button>
            </Tooltip>
          </Stack>

          {/* Confirmation Dialog */}
          <Dialog
            open={openConfirmation}
            onClose={() => setOpenConfirmation(false)}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this Ticket?
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


          <EntityAssignmentModal
            open={openModal}
            onClose={handleCloseModal}
            entityType="ticket"
            entityId={ticketId} // Pass the projectId as entityId
            entity={ticket}     // Pass the project as entity
            fetchEntityFn={TicketService.getTicketById} // Update with correct fetch function
            assignEntityFn={TicketService.addEmployee}   // Update with correct assign function
            removeEntityFn={TicketService.removeEmployee} // Update with correct remove function
          />
        </Paper>

        <Box alignItems="center" sx={{height:'400px'}}>
          <CommentProvider>
            <CommentList projectId={ticket.projectId} ticketId={ticketId} />
          </CommentProvider>

        </Box>
      </Stack>

    </Container>
  );
}

export default SingleTicketPage;
