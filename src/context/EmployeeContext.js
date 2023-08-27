import React, { createContext, useContext, useReducer } from 'react';
import EmployeeService from '../services/employeeService';
import EmployeeReducer from './EmployeeReducer';

const EmployeeContext = createContext();
export function EmployeeProvider({ children }) {
  const initialState = {
    employees: [], 
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    error: null,
  };
  
  const [state, dispatch] = useReducer(EmployeeReducer, initialState);
  

  const fetchEmployees = async () => {
    try {
      const response = await EmployeeService.getAllEmployees();
      console.log(response);
    dispatch({ type: 'SET_EMPLOYEES', payload:response });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
    
  };

  const deleteEmployeeById = async (employeeId) => {

    try {
      console.log(" in the employee context");
      const response = await EmployeeService.deleteEmployeeById(employeeId);
      console.log(response);
    dispatch({ type: 'DELETE_EMPLOYEE', payload:employeeId });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'ERROR', payload: error });
    }
    
  };
    const editEmployeeId = async (employeeId, formData) => {
      try {
    const response = await EmployeeService.editEmployeeById( employeeId, formData );

      console.log(response);
      dispatch({ type: 'EDIT_EMPLOYEE', payload: response});
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
  };



  return (
    <EmployeeContext.Provider  value={{
      employees: state.employees,
      page: state.page,
      size: state.size,
      totalElements: state.totalElements,
      totalPages: state.totalPages,
      error: state.error,
      dispatch,
      fetchEmployees,
      deleteEmployeeById,
      editEmployeeId
    }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployeeContext() {
  return useContext(EmployeeContext);
}
