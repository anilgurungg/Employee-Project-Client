// src/services/ProjectService.js
import axios from 'axios';
import API_BASE_URL from '../config';
import ApiException from '../ApiException';

const ProjectService = {
  getProjects: async (token, page=0, size=3) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },
  getProjectById: async (token, projectId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
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
  addProject: async (token, projectData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects`, projectData, {
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
  editProject: async (token, projectId, projectData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${projectId}`, projectData, {
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
  deleteProject: async (token, projectId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}`, {
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
        throw new ApiException('An error occurred while deleting the project.');
      }
    }
  },
  addEmployee: async (token, projectId,employeeId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/addAsignee/${employeeId}`, 
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
  removeEmployee: async (token, projectId,employeeId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/removeAsignee/${employeeId}`,
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

export default ProjectService;
