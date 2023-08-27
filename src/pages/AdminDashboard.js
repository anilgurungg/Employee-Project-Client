import React, { useEffect, useState } from 'react';
import AuthService from '../services/authService';
import { Typography, List, ListItem, ListItemText, Card, CardMedia, CardContent, Button, CardActions, Collapse, Grid, ListSubheader, Fade } from '@mui/material';
import emp from "../images/emp.png";
import { Link } from 'react-router-dom';
import ProjectsPage from './ProjectsPage';
import { useUserContext } from '../context/UserContext';
import EmployeeList from '../components/employee/EmployeeList';
import { EmployeeProvider } from '../context/EmployeeContext';


function AdminDashboardPage() {
  const { currentUser } = useUserContext();
  // const [userProfile, setUserProfile] = useState(null);
  const [showTickets, setShowTickets] = useState(false);


  useEffect(() => {
    // setUserProfile(currentUser);
    // async function fetchUserProfile() {
    //   const user = await AuthService.getUser();
    //   setUserProfile(user);
    // }

    // fetchUserProfile();
  }, []);

  return (
    <div>
      <Typography variant='h4' align='center' gutterBottom >Admin Dashboard</Typography>
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
                Name: {currentUser?.employeeName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Email: {currentUser?.emailId}
              </Typography>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={6}>
          {
          
          <EmployeeList />
        
          }
        </Grid>
      </Grid>
    </div>

  );
}

export default AdminDashboardPage;
