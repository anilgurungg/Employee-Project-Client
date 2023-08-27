// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import SingleProjectPage from './pages/SingleProjectPage';
import AddProjectPage from './pages/AddProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import { createTheme, ThemeProvider, Container, CssBaseline, Paper } from '@mui/material';
import { lime, green, yellow, indigo, red, grey, deepOrange, purple, teal, amber, lightGreen } from '@mui/material/colors';
import SingleTicketPage from './pages/SingleTicketPage';
import AddTicketPage from './pages/AddTicketPage';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import { UserProvider } from './context/UserContext';
import AdminDashboardPage from './pages/AdminDashboard';
import { EmployeeProvider } from './context/EmployeeContext';
import EditProjectPage from './pages/EditProjectPage';
import EditTicketPage from './pages/EditTicketPage';

const theme = createTheme(
  {
    palette: {
      primary: indigo,
      secondary: indigo 
    },
  }
);

function App() {
  
  return (
 
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md" minHeight >
          <CssBaseline />
         
      
          <Paper elevation={3} style={{
             display: "flex",
             flexDirection: "column",
             justifyContent: "space-between",
             alignItems: "stretch",
             flex: "1",
             padding: "20px",
             height: "100vh",
          }}>
            <UserProvider>
            <EmployeeProvider>
            <BrowserRouter>
              <Navbar />
             
              <Routes>
             
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/admin/*" element={<ProtectedRoute />}>
                  <Route index element={<AdminDashboardPage />} />
                </Route>
                {/* Protected Route: Dashboard Page */}

                <Route path="/dashboard/*" element={<ProtectedRoute />}>
                  <Route index element={<DashboardPage />} />
                </Route>
                <Route path="/projects/*" element={<ProtectedRoute />}>
                  <Route index element={<ProjectsPage />} />
                  <Route path="add" element={<AddProjectPage />} />
                  <Route path=":projectId" element={<SingleProjectPage />} />
                  <Route path=":projectId/edit" element={<EditProjectPage />} />
                  <Route path=":projectId/tickets/add" element={<AddTicketPage />} />
                  <Route path=":projectId/tickets/:ticketId" element={<SingleTicketPage />} />
                  <Route path=":projectId/tickets/:ticketId/edit" element={<EditTicketPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              
            </BrowserRouter>
            <Footer />
            </EmployeeProvider>
            </UserProvider>
          </Paper>
         
         
        </Container>
    </ThemeProvider>
   
  );
}

export default App;
