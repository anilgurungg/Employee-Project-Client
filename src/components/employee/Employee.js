import { useState } from 'react';
import { Card, Grid, Avatar, Divider, Stack, TextField, Button, Tooltip } from '@mui/material';
import EmpImage from '../../images/emp.png';
import EditButton from '../shared/EditButton';
import DeleteButton from '../comment/DeleteButton';
import ConfirmationModal from '../shared/ConfirmationModal';
import EditEmployeeModal from './EditEmployeeModal';
import { useEmployeeContext } from '../../context/EmployeeContext';

function Employee({ employee }) {
  const { deleteEmployeeById, dispatch } = useEmployeeContext();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleDeleteEmployee = () => {
    console.log("trying to delete");
    deleteEmployeeById(employee.employeeId)
      .catch(err => {
        dispatch({ type: 'SET_ERROR', payload: err });
      });

  };


  return (
    <>
      <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'flex-start'}>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} width={'35px'}>
          <Avatar alt="User" src={EmpImage} style={{ height: '40px', width: '40px', borderRadius: '40px', borderColor: 'grey', border: 'solid' }} />
        </Stack>

        <Stack direction={'column'} justifyContent={'flex-start'} alignItems={'left'} marginLeft={'30px'}  >
          <p style={{ textAlign: "left", marginTop: '7px' }}>{employee.employeeId}</p>
          <p style={{ textAlign: "left", marginTop: 0 }}>{employee.employeeName}</p>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'} marginLeft={'auto'} >

          <EditButton onClick={() => setOpenEditModal(true)} />


          <DeleteButton onClick={() => setOpenConfirmation(true)} />
        </Stack>

      </Stack>

      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      <ConfirmationModal
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)} // Close modal
        setOpen={setOpenConfirmation}
        onConfirm={() => {
          handleDeleteEmployee(); // Call the onDelete function passed as a prop
          setOpenConfirmation(false); // Close the modal after deletion
        }}
        name="employee"
      />
      <EditEmployeeModal open={openEditModal} handleClose={() => setOpenEditModal(false)} employee={employee} />
    </>
  );
}

export default Employee;
