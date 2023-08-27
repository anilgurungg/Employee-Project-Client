import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditForm from './EditForm';
import { useEmployeeContext } from '../../context/EmployeeContext';

const EditEmployeeModal = ({  open, handleClose, employee}) => {
  const { editEmployeeId}  = useEmployeeContext();
 

  const handleEdit = async (formData) => {
    editEmployeeId( employee.employeeId, formData );
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle align='center'>Edit Employee Profile</DialogTitle>
      <DialogContent>
        <EditForm initialData={employee} onSubmit={handleEdit} />
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditEmployeeModal;