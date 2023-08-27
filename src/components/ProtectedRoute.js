import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/authService';
import { useUserContext } from '../context/UserContext';

function ProtectedRoute() {
  const isAuthenticated = AuthService.isAuthenticated();
  const { currentUser } = useUserContext();

  if (isAuthenticated) {
    return <Outlet />; // Render nested routes
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
