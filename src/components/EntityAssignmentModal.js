import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField, Typography, Box } from '@mui/material';
import AuthService from '../services/authService';
import ApiException from '../ApiException';
import useApiError from '../services/useApiError';
import EmployeeService from '../services/employeeService';
import TicketService from '../services/ticketService';

function EntityAssignmentModal({ open, onClose, entityId, entity, fetchEntityFn, assignEntityFn, removeEntityFn, entityType }) {
  const [entities, setEntities] = useState([]);
  const[employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { error, handleApiError, clearError } = useApiError();
  const token = AuthService.getToken();

  async function fetchEntity() {
    try {
      const token = AuthService.getToken();
      var entityData =[];
     
      if ( entityType == 'project' ) {

         entityData = await fetchEntityFn(token,  entityId);
      } else if (entityType == 'ticket') {
         entityData = await fetchEntityFn(token, entity.projectId, entityId);
      } else {
        console.log("not working");
      }

      const employees = await Promise.all(
        entityData.assignedEmployeeIds.map(async (employeeId) => {
          const profile = await EmployeeService.getEmployeeById(token, employeeId); // Replace with actual function
          return { ...profile,
            isAdded: true};
        })
      );

     setEmployees(employees);
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

  useEffect(() => {  

    fetchEntity();
  }, [open, token, searchTerm]);

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

        if ( entityType == 'project' ) {
          console.log(`removing ${employeeId} to project ${entityId}`);
          const response =  await removeEntityFn(token, entityId, employeeId);
        } else if (entityType == 'ticket') {
          console.log(`removing ${employeeId} from ticket ${entityId}`);
          const response =  await removeEntityFn(token, entity.projectId, employeeId ,entityId);
        } else {
          console.log("not working");
        }
        
       
        fetchEntity();
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
        if ( entityType == 'project' ) {
          console.log(`adding ${employeeId} to project ${entityId}`);
          const response =  await assignEntityFn(token, entityId, employeeId);
        } else if (entityType == 'ticket') {
          console.log(`adding ${employeeId} from ticket ${entityId}`);
          const response =  await assignEntityFn(token, entity.projectId, employeeId ,entityId);
        } else {
          console.log("not working");
        }
       
       
        fetchEntity();
      } catch (error) {
        if (error instanceof ApiException) {
          handleApiError(error.message);
        } else {
          handleApiError('An error occurred while getting the employees');
        } 
      } 
    };
  const handleClose = () => {
    setSearchTerm("");
    setEntities([]); // Clear entities when modal is closed
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle align='center'>Assign Entity</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
          <TextField
            label="Search Entities"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginRight: 2 }}
          />
          <Button variant="outlined" onClick={handleSearch}>Search</Button>
        </Box>

        {employees.length === 0 ? (
          <Typography>No entities found.</Typography>
        ) : (
          <List>
            {employees.map(entity => (
              <ListItem key={entity.entityId}>
                <ListItemText primary={entity.employeeName} secondary={entity.role} />
                {entity.isAdded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveEmployee(entity.employeeId)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddEmployee(entity.employeeId)}
                  >
                    Add
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EntityAssignmentModal;
