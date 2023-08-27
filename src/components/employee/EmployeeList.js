
import { useEffect, useState } from 'react';
import Employee from './Employee';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { Paper } from '@mui/material';

function EmployeeList() {
  const { page, size, totalElements, employees,  fetchEmployees, dispatch} = useEmployeeContext();
  const [loading, setIsLoading] = useState(true);
  

  useEffect(() => {
    fetchEmployees()
    .catch(err => {
      dispatch({ type: 'SET_ERROR', payload: err });
    })
    .finally(() => setIsLoading(false));
    // console.log(employees);
  }, [dispatch, size ]);


  return (
      <Paper  style={{ flex: 1, overflow: 'auto', padding: "40px 20px", width: 400,  maxHeight: 400,}}>
        <div style={{marginBottom:30}}>
      </div>
        <div style={{ width: '100%' }}>
          {loading ? <p> Loading..</p> : (employees.length > 0 ? (employees.map((employee) => (
            <Employee key={employee.employeeId} employee={employee} />
          ))) : <p>No Employees</p>)}
        </div>
      </Paper>
  );
}

export default  EmployeeList;
