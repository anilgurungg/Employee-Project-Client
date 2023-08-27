import axios from 'axios';
import ApiException from '../ApiException';

import API_BASE_URL from '../config';
import AuthService from './authService';



const CommentService = {
  
  getCommentsForTicket: async ( projectId, ticketId) => {
   
  try {
    const token = AuthService.getToken();
    console.log(token);
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

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

 addCommentToTicket : async (projectId, ticketId, text) => {
  try {
    const token = AuthService.getToken();
    console.log(token);
    const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}/comments`, {text}  ,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

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
removeCommentFromTicket : async (projectId, ticketId,commentId) => {
  try {
    const token = AuthService.getToken();
    console.log(token);
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}/comments/${commentId}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

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
editComment : async (projectId, ticketId, commentId, text) => {
  try {
    const token = AuthService.getToken();
    console.log(token);
    const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/tickets/${ticketId}/comments/${commentId}`, {text}  ,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

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
voteComment : async ( commentId, voteType) => {
  try {
    const token = AuthService.getToken();
    const response = await axios.put(`${API_BASE_URL}/comments/${commentId}/vote`, {voteType}  ,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

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
unvoteComment : async ( commentId) => {
  try {
    const token = AuthService.getToken();
    const response = await axios.put(`${API_BASE_URL}/comments/${commentId}/unvote`, 
    null,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

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
}

export default CommentService;