import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AuthService from '../services/authService';
import { useUserContext } from '../context/UserContext';
import './Navbar.css';

function Navbar() {
  const { currentUser, logout, isAdmin } = useUserContext(); 
  const isAuthenticated = AuthService.isAuthenticated();
  // const isAdmin = currentUser && currentUser.roles.some(role => role.name === 'ROLE_ADMIN');
  const navigate = useNavigate();
  const location = useLocation();
  const activeClassName = "active-link";

  const renderLoginButton = () => (
    <Button color="inherit" component={Link} to="/login">
      Login
    </Button>
  );

  const renderAdminDashboardButton = () => (
    <Button color="inherit" component={Link} to="/admin">
      Admin Dashboard
    </Button>
  );

  const renderDashboardButton = () => (
    <Button color="inherit" component={Link} to="/dashboard">
      Dashboard
    </Button>
  );

  const renderProjectsButton = () => (
    <Button color="inherit" component={Link} to="/projects">
      Projects
    </Button>
  );

  const renderAddProjectsButton = () => (
    <Button color="inherit" component={Link} to="/projects/add">
      Add A New Project
    </Button>
  );

  const renderLogoutButton = () => (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );

  const handleLogout = () => {
    AuthService.logout();
    // You can add additional logic for redirection or other actions after logout
    navigate('/login');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EMP MNGR
        </Typography>
        {isAdmin  && renderAdminDashboardButton()}
        {currentUser  ? renderDashboardButton() : renderLoginButton()}
        {currentUser  && renderProjectsButton()}
        {currentUser  &&   isAdmin  && location.pathname=== '/projects' && renderAddProjectsButton()}
        {currentUser  && renderLogoutButton()}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
