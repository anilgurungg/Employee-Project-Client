import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField, Typography, Box } from '@mui/material';
import EmployeeService from '../services/employeeService';
import ProjectService from '../services/projectService';
import AuthService from '../services/authService';
import ApiException from '../ApiException';
import useApiError from '../services/useApiError';

function AsigneeModal({ open, onClose, projectId, project }) {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   const {error, handleApiError, clearError} = useApiError();
   const token = AuthService.getToken();
  // You can replace this with your API call to fetch employees from /employees


  useEffect(() => {
    async function fetchProject() {
      try {
          const token = AuthService.getToken(); // Get the JWT token using AuthService
          const projectData = await ProjectService.getProjectById(token, projectId);
          const employeesWithStatus = projectData.employees.map(employee => ({
            ...employee,
            isAdded: true // You can determine the initial value based on your logic
          }));
        
          setEmployees(employeesWithStatus);
        } catch (error) {
          if (error instanceof ApiException && error.status === 401) {
            handleApiError(error.message);
          }  else if (error instanceof ApiException && error.status === 404) {
              handleApiError(error.message);
              // Handle 404 error (Project Not Found)
          } else {
            handleApiError('An error occurred while fetching the project.');
          }
        }
  }

  fetchProject();

  }, [open, token, searchTerm]);
  // 

  const handleSearch = async () => {
    try {
       
        const employeeListData =  await EmployeeService.searchEmployees(token, searchTerm);
        const newEmployees = employeeListData.data.filter((newEmployee) => 
      !employees.some((existingEmployee) => existingEmployee.employeeId === newEmployee.employeeId)
    );
        setEmployees((employees) => [...employees, ...newEmployees]);
        // setEmployees(employeeListData.data);
      
      } catch (error) {
        if (error instanceof ApiException) {
          handleApiError(error.message);
        } else {
          handleApiError('An error occurred while getting the employees');
        } 
      } 
    };

    const handleRemoveEmployee = async (employeeId) => {
      try {
        console.log(`removing ${employeeId} to project ${projectId}`);
        const response =  await ProjectService.removeEmployee(token, projectId, employeeId);
        const employeesWithStatus = response.data.employees.map(employee => ({
          ...employee,
          isAdded: true // You can determine the initial value based on your logic
        }));
      
        setEmployees(employeesWithStatus);
      } catch (error) {
        if (error instanceof ApiException) {
          handleApiError(error.message);
        } else {
          handleApiError('An error occurred while getting the employees');
        } 
      } 
    };
  
    const handleAddEmployee = async(employeeId) => {
      try {
        console.log(`adding ${employeeId} to project ${projectId}`);
        const response =  await ProjectService.addEmployee(token, projectId, employeeId);
        const employeesWithStatus = response.data.employees.map(employee => ({
          ...employee,
          isAdded: true // You can determine the initial value based on your logic
        }));
      
        setEmployees(employeesWithStatus);
      } catch (error) {
        if (error instanceof ApiException) {
          handleApiError(error.message);
        } else {
          handleApiError('An error occurred while getting the employees');
        } 
      } 
    };

    
  const isEmployeeAdded = (employeeId) => {
    return project.employees.some((employee) => employee.employeeId === employeeId);
  };
  
  

    const handleClose = () => {
        setSearchTerm(""); // Clear the search term
        setEmployees(project.employees);
        onClose(); // Close the modal
      };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle align='center'>Add Employee to Project</DialogTitle>
      <DialogContent>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
      <TextField
          label="Search Employees"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{
            shrink: true, // Prevent label animation
          }}
          sx={{ marginRight:2 }}
          
        />
          <Button variant="outlined" onClick={handleSearch}>Search</Button>
        </Box>
      
     {   employees.length === 0 ? (
   <Typography>No employees found.</Typography>
  ) :
        <List>
          {employees.map((employee) => (
            <ListItem key={employee.employeeId}>
              <ListItemText primary={employee.employeeName} secondary={employee.role} />
              {employee.isAdded ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleRemoveEmployee(employee.employeeId)}
        >
          Remove
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddEmployee(employee.employeeId)}
        >
          Add
        </Button>
      )}
              {/* <Button
        variant="contained"
        color={isEmployeeAdded(employee.employeeId) ? "secondary" : "primary"}
        onClick={() => handleEmployeeAction(employee.employeeId)}
      >
        {isEmployeeAdded(employee.employeeId) ? "Remove" : "Add"}
      </Button> */}
            </ListItem>
          ))}
        </List>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AsigneeModal;
