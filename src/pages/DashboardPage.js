import React, { useEffect, useState } from 'react';
import AuthService from '../services/authService';
import { Typography, List, ListItem, ListItemText, Card, CardMedia, CardContent, Button, CardActions, Collapse, Grid, ListSubheader, Fade } from '@mui/material';
import emp from "../images/emp.png";
import { Link } from 'react-router-dom';
import EditEmployeeModal from '../components/employee/EditEmployeeModal';
import { useEmployeeContext } from '../context/EmployeeContext';
import { useUserContext } from '../context/UserContext';



function DashboardPage() {
  const { currentUser, fetchCurrentUser, loading } = useUserContext();

  const [userProfile, setUserProfile] = useState(null);
  const [showTickets, setShowTickets] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { dispatch } = useEmployeeContext();

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  }

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };



  useEffect(() => {
    fetchCurrentUser();
    setUserProfile(currentUser);
    console.log(currentUser);
  }, [dispatch]);

  const handleShowTickets = () => {
    setShowTickets(!showTickets);
  };

  return (
    <div>
      {loading ? <p>loading....</p> : (
        <>
      <Typography variant='h4' align='center' gutterBottom >Welcome to the Dashboard</Typography>
      <Grid container spacing={2}>
      
        <Grid item xs={6}>
          <Card>
            <CardMedia
              sx={{ height: 0, paddingTop: '56.25%' }}
              image={emp}
              title="Employee"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Name: {userProfile?.employeeName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Email: {userProfile?.emailId}
              </Typography>
              <CardActions>
                {/* <Button size="small" onClick={handleShowTickets}>
                  Show Tickets
                </Button> */}
                <Button size="small" onClick={handleOpenEditModal}>
                 Edit Profile
                </Button>
              </CardActions>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={6}>
          {userProfile ? (
            // <Collapse in={showTickets} timeout="auto" unmountOnExit>
            //   <Fade in={showTickets} timeout={500}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', overflow: 'auto'  }} >
                <Typography variant="h6" sx={{padding:'10px'}} >
                  Tickets:
                </Typography>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                  }}
                >
                      <ul>
                        {userProfile.tickets.map((ticket, index) => (
                        <Link to={`/projects/${ticket.projectId}/tickets/${ticket.ticketId}`}>
                        <ListItem key={index}>
                         <ListItemText
                          secondary={`Ticket ID: ${ticket.ticketId}`}
                           primary={`${ticket.subject}`}
                         />
                         
                       </ListItem>
                       </Link>
                        ))}
                      </ul>
                </List>
              </Card>
            //   </Fade>
            // </Collapse>
          ) : <p>No Tickets</p> }
        </Grid>
      </Grid>
      <EditEmployeeModal open={openEditModal} handleClose={handleCloseEditModal} employee={userProfile} />
      </>
      )}
    </div>

  );
}

export default DashboardPage;
