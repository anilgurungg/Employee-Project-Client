import axios from 'axios';
import API_BASE_URL from '../config';
import ApiException from '../ApiException';
import AuthService from './authService';

const TOKEN_KEY = 'jwtToken';
const EmployeeService = {
    getAllEmployees: async (token) => {
        try {
          const response = await axios.get(`${API_BASE_URL}/employees`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          return response.data;

        } catch (error) {
          console.log(error);
          if (error.response && error.response.data) {
            const { message, success } = error.response.data;
            const statusCode = error.response.status;
            if (statusCode == 401) {
              throw new ApiException(message, statusCode);
            } else if (statusCode == 404) {
              throw new ApiException( message, statusCode);
            } else if (statusCode == 403) {
              throw new ApiException('Access is denied', statusCode);
            }
            throw new ApiException(message);
          } else {
            throw new ApiException('An error occurred while fetching the project.');
          }
        }
      },
      getEmployeeById: async (token, employeeId) => {
        try {
          const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;

        } catch (error) {
          if (error.response && error.response.data) {
            const { message, success } = error.response.data;
            const statusCode = error.response.status;
            if (statusCode == 401) {
              throw new ApiException(message, statusCode);
            } else if (statusCode == 404) {
              throw new ApiException( message, statusCode);
            } else if (statusCode == 403) {
              throw new ApiException('Access is denied', statusCode);
            }
            throw new ApiException(message);
          } else {
            throw new ApiException('An error occurred while fetching the project.');
          }
        }
      },
      editEmployeeById: async (employeeId, formData) => {
        const token =  AuthService.getToken();
        try {
          const response = await axios.put(`${API_BASE_URL}/employees/${employeeId}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;

        } catch (error) {
          console.log(error);
          if (error.response && error.response.data) {
            const { message, success } = error.response.data;
            const statusCode = error.response.status;
            if (statusCode == 401) {
              throw new ApiException(message, statusCode);
            } else if (statusCode == 404) {
              throw new ApiException( message, statusCode);
            } else if (statusCode == 403) {
              throw new ApiException('Access is denied', statusCode);
            }
            throw new ApiException(message);
          } else {
            throw new ApiException('An error occurred while updating the account.');
          }
        }
      },
      deleteEmployeeById: async (employeeId) => {
        const token =  AuthService.getToken();
        try {
          const response = await axios.delete(`${API_BASE_URL}/employees/${employeeId}`,  {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;

        } catch (error) {
          console.log(error);
          if (error.response && error.response.data) {
            const { message, success } = error.response.data;
            const statusCode = error.response.status;
            if (statusCode == 401) {
              throw new ApiException(message, statusCode);
            } else if (statusCode == 404) {
              throw new ApiException( message, statusCode);
            } else if (statusCode == 403) {
              throw new ApiException('Access is denied', statusCode);
            }
            throw new ApiException(message);
          } else {
            throw new ApiException('An error occurred while updating the account.');
          }
        }
      },

      // searchEmployees: async (token, searchTerm) => {
      //   try {
      //     const response = await axios.get(`${API_BASE_URL}/employees/search?searchTerm=${searchTerm}`, {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     });
      //     return response;

      //   } catch (error) {
      //     if (error.response && error.response.data) {
      //       const { message, success } = error.response.data;
      //       const statusCode = error.response.status;
      //       if (statusCode == 401) {
      //         throw new ApiException(message, statusCode);
      //       } else if (statusCode == 404) {
      //         throw new ApiException( message, statusCode);
      //       } else if (statusCode == 403) {
      //         throw new ApiException('Access is denied', statusCode);
      //       }
      //       throw new ApiException(message);
      //     } else {
      //       throw new ApiException('An error occurred while fetching the project.');
      //     }
      //   }
      // },
       searchEmployees: async (token, searchTerm) => {
        try {
          const response = await axios.get(`${API_BASE_URL}/employees/search?searchTerm=${searchTerm}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response;

        } catch (error) {
          if (error.response && error.response.data) {
            const { message, success } = error.response.data;
            const statusCode = error.response.status;
            if (statusCode == 401) {
              throw new ApiException(message, statusCode);
            } else if (statusCode == 404) {
              throw new ApiException( message, statusCode);
            } else if (statusCode == 403) {
              throw new ApiException('Access is denied', statusCode);
            }
            throw new ApiException(message);
          } else {
            throw new ApiException('An error occurred while searching.');
          }
        }
      }
};

export default EmployeeService;