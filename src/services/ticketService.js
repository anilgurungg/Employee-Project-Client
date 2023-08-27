// src/services/ProjectService.js
import axios from 'axios';
import API_BASE_URL from '../config';
import ApiException from '../ApiException';

const TicketService = {
  getTicketByProjectId: async (token, projectId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/tickets`, {
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
  getTicketById: async (token, projectId,ticketId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}`, {
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
  addTicket: async (token,projectId, ticketData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/tickets`, ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, success } = error.response.data;
        if (!success && error.response.status === 401) {
          throw new ApiException(message, 401);
        }
        throw new ApiException(message || 'An error occurred while adding the project.');
      } else {
        throw new ApiException('An error occurred while adding the project.');
      }
    }
  },
  editTicket: async (token,projectId, ticketId, ticketData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}`, ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, success } = error.response.data;
        if (!success && error.response.status === 401) {
          throw new ApiException(message, 401);
        }
        throw new ApiException(message || 'An error occurred while adding the project.');
      } else {
        throw new ApiException('An error occurred while adding the project.');
      }
    }
  },
  deleteTicket: async (token, projectId,ticketId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new ApiException('An error occurred while deleting the project.');
    }
  },
  addEmployee: async (token, projectId,employeeId,ticketId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}/addAsignee/${employeeId}`, 
      null,
       {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw new ApiException('An error occurred while adding employees to the project.');
    }
  },
  removeEmployee: async (token, projectId,employeeId, ticketId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}/removeAsignee/${employeeId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw new ApiException('An error occurred while deleting the project.');
    }
  },

};

export default TicketService;
