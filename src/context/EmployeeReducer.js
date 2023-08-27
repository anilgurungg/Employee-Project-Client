

const EmployeeReducer = (state, action) => {
    switch (action.type) {
      case 'SET_EMPLOYEES':
      
        return {
          ...state,
          employees: action.payload.content,
          page: action.payload.page,
          size: action.payload.size,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages
        };
        case 'DELETE_EMPLOYEE':
        console.log(action.payload);
        const employeeIdToDelete = action.payload;
        const updatedEmployees = state.employees.filter(employee => employee.employeeId !== employeeIdToDelete);
        return {
          ...state,
          employees: updatedEmployees,
          // size: state.size -1
        };
        case 'EDIT_EMPLOYEE':
        // Find the index of the edited comment in the state
        const editedEmployeeIndex = state.employees.findIndex(employee => employee.employeeId === action.payload.employeeId);
  
        // Create a new comment object with updated data
        const updatedEmployee = {
          ...state.employees[editedEmployeeIndex],
         
          employeeName: action.payload.employeeName,
          salary: action.payload.salary,
          emailId: action.payload.emailId
        };
  
        // Create a new state with the updated comment
        const updatedState = {
          ...state,
          employees: [
            ...state.employees.slice(0, editedEmployeeIndex),
            updatedEmployee,
            ...state.employees.slice(editedEmployeeIndex + 1),
          ],
        };
        return updatedState;
  
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default EmployeeReducer;
  